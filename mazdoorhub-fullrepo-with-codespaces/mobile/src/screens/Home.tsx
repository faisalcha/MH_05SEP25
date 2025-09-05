import React, { useState } from 'react';
import { View, Text, Switch, Button } from 'react-native';
import api from '../api';

export default function Home({ navigation }) {
  const [avail, setAvail] = useState(true);

  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 18, marginBottom: 8 }}>Worker Availability</Text>
      <Switch value={avail} onValueChange={async (v)=>{ setAvail(v); try { await api.patch('/v1/workers/me/availability', { isAvailable: v }); } catch(e){} }} />

      <View style={{ height: 16 }} />
      <Button title="Find workers near me (list)" onPress={async ()=>{
        const res = await api.get('/v1/workers/shortlist?lat=31.52&lon=74.36');
        console.log(res.data);
      }} />

      <View style={{ height: 16 }} />
      <Button title="Open Map (nearby workers)" onPress={()=>navigation.navigate('MapShortlist')} />

      <View style={{ height: 16 }} />
      <Button title="Open Payment" onPress={()=>navigation.navigate('Payment', { jobId: 'demo-job', amountPkr: 500 })} />

      <View style={{ height: 16 }} />
      <Button title="Rate Someone" onPress={()=>navigation.navigate('Rate', { jobId: 'demo-job', rateeId: 'user-2' })} />
    </View>
  );
}
