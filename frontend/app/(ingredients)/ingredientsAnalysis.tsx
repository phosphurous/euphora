import { Text, StyleSheet, Image, FlatList, TouchableHighlight, Modal, TextInput, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import React from 'react'
import { View } from '@/components/Themed';
import { useState, useEffect } from 'react';

const CircleRisk = ({circleColor}) => {
    return (
        <TouchableOpacity>
            <View style={styles.checkboxContainer}>
                <View style={{width: 16,height: 16,borderRadius: 10,borderWidth: 1, borderColor: '#FFFFFF', alignItems: 'center',justifyContent: 'center',marginRight: 10, backgroundColor: circleColor}}>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const data = [
    {
        id: 1,
        ingredientName: 'Phenoxyethanol',
        negativeReaction: 'Rash like hives',
        riskLevel: 'high'
    },
    {   
        id: 2,
        ingredientName: 'Lavandula Angustifolia Oil',
        negativeReaction: 'Can irritate skin',
        riskLevel: 'medium'
    },
    {
        id: 3, 
        ingredientName:'Carum Petroselinum Seed Oil',
        negativeReaction: 'Can irritate skin',
    }]

export default function IngredientsAnalysis() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Analysis</Text>
            <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
            <View style={styles.topHalf}>
                <View style={styles.product}>
                    <Image source={require('../../assets/images/aesopProduct.png')}></Image>
                    <View style={{ display: 'flex', justifyContent: 'center' }}>
                        <Text>Brand</Text>
                        <Text style={{ fontSize: 16 }}>Product Name</Text>
                    </View>

                </View>
                <View style={{ display: 'flex', alignItems: 'center' }}>
                    <Text style={{ fontSize: 22, fontWeight: 700 }}>5 harmful ingredients found</Text>
                </View>
                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly'}}>
                    <View style={styles.riskLevel}>
                        <Text style={{ fontSize: 60 }}>1</Text>
                        <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                            <CircleRisk circleColor={'#ED5B55'}/>
                            <CircleRisk circleColor={'#ED5B55'}/>
                            <CircleRisk circleColor={'#ED5B55'}/>
                        </View>
                        <Text style={{ fontSize: 16 }}>High Risk</Text>
                    </View>
                    <View style={styles.verticalSeparator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
                    <View style={styles.riskLevel}>
                        <Text style={{ fontSize: 60 }}>2</Text>
                        <View style={{display: 'flex', flexDirection: 'row', justifyContent:'space-between'}}>
                            <CircleRisk circleColor={'#FB953C'}/>
                            <CircleRisk circleColor={'#FB953C'}/>
                            <CircleRisk circleColor={'#AEB5BD'}/>
                        </View>
                        <Text style={{ fontSize: 16 }}>Medium Risk</Text>
                    </View>
                    <View style={styles.verticalSeparator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
                    <View style={styles.riskLevel}>
                        <Text style={{ fontSize: 60 }}>1</Text>
                        <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                            <CircleRisk circleColor={'#F6CC29'}/>
                            <CircleRisk circleColor={'#AEB5BD'}/>
                            <CircleRisk circleColor={'#AEB5BD'}/>
                        </View>
                        <Text style={{ fontSize: 16 }}>Low Risk</Text>
                    </View>
                </View>
            </View>
            <View style={styles.ingredientsRiskSection}>
                <View style={styles.ingredientBox}>
                    <Text>Ingredient Name</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF'
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        paddingTop: 30,
        paddingLeft: 20
    },
    separator: {
        marginVertical: 20,
        height: 1,
        width: '100%',
    },
    product: {
        display: 'flex',
        flexDirection: 'row'
    },
    topHalf: {
        paddingHorizontal: 40,
        paddingBottom: 15 
    },
    riskLevel: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    ingredientsRiskSection: {
        backgroundColor: '#E9F4E4',
        flex: 1,
        borderTopLeftRadius: 60,
        borderTopRightRadius: 60,
        alignItems: 'center',
        paddingTop: 40
    },
    verticalSeparator: {
        height: 130,
        width: '0.5%'
    },
    ingredientBox: {
        borderRadius: 15,
        padding: 20,
        width: '80%',
        backgroundColor: '#FFE5E5'
    },
});