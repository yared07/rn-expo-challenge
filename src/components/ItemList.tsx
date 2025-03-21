import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'

const ItemList = ({ item, setSelectedExercise }) => {
  return (
        <TouchableOpacity onPress={() => setSelectedExercise(item)} className='p-1 bg-white rounded-full m-2'>
        <Image source={{ uri: item.asset_url }} className="w-24 h-24 rounded-full border-2 border-gray-200" />
        </TouchableOpacity>
  )
}

export default ItemList

const styles = StyleSheet.create({})