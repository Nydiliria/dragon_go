import React, {useEffect, useRef} from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import {WebView} from 'react-native-webview';

export default function LeafletMap({userLocation, hotspots, selectedHotspot}) {
    const webViewRef = useRef(null);

    useEffect(() => {
        // Stuur updates naar de kaart zodra de data in de schermen verandert
        if (webViewRef.current) {
            webViewRef.current.postMessage(JSON.stringify({
                type: 'UPDATE_DATA',
                userLocation,
                hotspots,
                focusHotspot: selectedHotspot
            }));
        }
    }, [userLocation, hotspots, selectedHotspot]);

    const mapHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
      <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
      <style>
        body, html, #map { margin: 0; padding: 0; height: 100%; width: 100%; }
        .leaflet-popup-content-wrapper { border-radius: 8px; font-family: sans-serif; }
        .popup-title { font-weight: bold; }
      </style>
    </head>
    <body>
      <div id="map" style="height: 100%"></div>
      <script>
        var map = L.map('map', { zoomControl: false }).setView([52.1326, 5.2913], 8);
        L.control.zoom({ position: 'bottomright' }).addTo(map);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

        var userMarker = null;
        var hotspotLayer = L.layerGroup().addTo(map);
        var userIcon = L.divIcon({
          className: 'user-icon',
          html: '<div style="background-color: #3b82f6; width: 14px; height: 14px; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 8px rgba(0,0,0,0.4);"></div>',
          iconSize: [20, 20],
          iconAnchor: [10, 10]
        });

        window.addEventListener('message', function(event) {
          var data = JSON.parse(event.data);
          if (data.type === 'UPDATE_DATA') {
            if (data.userLocation) {
              var uLat = data.userLocation.latitude;
              var uLon = data.userLocation.longitude;
              if (!userMarker) {
                userMarker = L.marker([uLat, uLon], { icon: userIcon }).addTo(map);
                if (!data.focusHotspot) map.setView([uLat, uLon], 14);
              } else {
                userMarker.setLatLng([uLat, uLon]);
              }
            }

            hotspotLayer.clearLayers();
            if (data.hotspots) {
              data.hotspots.forEach(function(spot) {
                var marker = L.marker([spot.latitude, spot.longitude])
                  .bindPopup('<div class="popup-title">' + spot.title + '</div><div>' + spot.description + '</div>');
                hotspotLayer.addLayer(marker);

                if (data.focusHotspot && data.focusHotspot.id === spot.id) {
                  map.setView([spot.latitude, spot.longitude], 16);
                  marker.openPopup();
                }
              });
            }
          }
        });
      </script>
    </body>
    </html>
  `;

    return (
        <WebView
            ref={webViewRef}
            originWhitelist={['*']}
            source={{html: mapHtml}}
            style={styles.map}
            onLoadEnd={() => {
                if (webViewRef.current) {
                    webViewRef.current.postMessage(JSON.stringify({
                        type: 'UPDATE_DATA',
                        userLocation,
                        hotspots,
                        focusHotspot: selectedHotspot
                    }));
                }
            }}
        />
    );
}

const styles = StyleSheet.create({
    map: {flex: 1, width: '100%', height: '100%'},
});