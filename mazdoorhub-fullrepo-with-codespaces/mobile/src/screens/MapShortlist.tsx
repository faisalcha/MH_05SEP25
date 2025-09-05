import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import api from '../api';

export default function MapShortlist() {
  const [loading, setLoading] = useState(true);
  const [region, setRegion] = useState({ latitude: 31.5204, longitude: 74.3587, latitudeDelta: 0.05, longitudeDelta: 0.05 });
  const [workers, setWorkers] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        const loc = await Location.getCurrentPositionAsync({});
        setRegion(r => ({ ...r, latitude: loc.coords.latitude, longitude: loc.coords.longitude }));
        const res = await api.get(`/v1/workers/shortlist?lat=${loc.coords.latitude}&lon=${loc.coords.longitude}&meters=5000`);
        setWorkers(res.data);
      }
      setLoading(false);
    })();
  }, []);

  if (loading) return <View style={{ flex:1, justifyContent:'center', alignItems:'center' }}><ActivityIndicator/></View>;
  return (
    <MapView style={{ flex:1 }} initialRegion={region}>
      {workers.map((w,i)=> w.lat && w.lon ? (
        <Marker key={i} coordinate={{ latitude: w.lat, longitude: w.lon }} title={w.name || 'Worker'} description={w.skills} />
      ) : null)}
    </MapView>
  );
}
