import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import api from '../api';

export default function Rate({ route }) {
  const { jobId, rateeId } = route.params || {};
  const [stars, setStars] = useState('5');
  const [comment, setComment] = useState('');
  return (
    <View style={{ padding: 16 }}>
      <TextInput value={stars} onChangeText={setStars} placeholder="Stars (1-5)" keyboardType="numeric" style={{ borderWidth: 1, marginBottom: 8, padding: 8 }} />
      <TextInput value={comment} onChangeText={setComment} placeholder="Comment" style={{ borderWidth: 1, marginBottom: 8, padding: 8 }} />
      <Button title="Submit" onPress={async ()=>{ await api.post('/v1/ratings', { jobId, rateeId, stars: parseInt(stars), comment }); alert('Thanks!'); }} />
    </View>
  );
}
