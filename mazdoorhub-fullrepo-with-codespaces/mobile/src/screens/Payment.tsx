import React from 'react';
import { View, Text, Button } from 'react-native';
import api from '../api';

export default function Payment({ route }) {
  const { jobId, amountPkr } = route.params || {};
  const pay = async (method: 'jazzcash'|'easypaisa') => {
    const res = await api.post('/v1/payments/initiate', { jobId, amountPkr, method });
    alert('Initiated with ' + method);
  };
  return (
    <View style={{ padding: 16 }}>
      <Text>Job: {jobId}</Text>
      <Text>Amount: Rs {amountPkr}</Text>
      <Button title="Pay JazzCash" onPress={()=>pay('jazzcash')} />
      <Button title="Pay EasyPaisa" onPress={()=>pay('easypaisa')} />
      <Button title="Mark Cash Paid" onPress={async ()=>{ await api.post(`/v1/jobs/${jobId}/cash-paid`, { amount: amountPkr }); alert('Marked cash'); }} />
    </View>
  );
}
