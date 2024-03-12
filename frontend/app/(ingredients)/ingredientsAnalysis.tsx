import { Text, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import { View } from '@/components/Themed';
import { useState, useEffect, useRef } from 'react';
import { TabView, SceneMap } from 'react-native-tab-view';
import PagerView from 'react-native-pager-view';

const CircleRisk = ({ circleColor }) => {
    return (
        <TouchableOpacity style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <View style={styles.checkboxContainer}>
                <View style={{ width: 16, height: 16, borderRadius: 10, borderWidth: 1, borderColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center', backgroundColor: circleColor, marginHorizontal: 2 }}>
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
        ingredientName: 'Carum Petroselinum Seed Oil',
        negativeReaction: 'Can irritate skin',
    }]



export default function Analysis() {
    const pagerRef = useRef(null);
    const [currentPage, setCurrentPage] = useState(0);
    const setPage = (page) => {
        if (pagerRef.current) {
            pagerRef.current.setPage(page);
            setCurrentPage(page);
        }
    };
    return (
        <View style={{ flex: 1 }}>
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
                <View style={{ display: 'flex', flexDirection: 'row', backgroundColor:'#E9F4E4', justifyContent:'space-evenly', paddingVertical:5, borderRadius:10 }}>
                    <TouchableOpacity onPress={() => setPage(0)} style={{display:'flex', alignItems:'center', justifyContent:'center', padding: 5, borderRadius:5, flexBasis:'45%', backgroundColor: currentPage === 0 ?'rgba(255,255,255,1)' : 'rgba(255,255,255,0)'}}>
                        <Text>Ingredients</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setPage(1)} style={{display:'flex', alignItems:'center', justifyContent:'center', padding: 5, borderRadius:5, flexBasis:'45%', backgroundColor:currentPage === 1 ?'rgba(255,255,255,1)' : 'rgba(255,255,255,0)'}}>
                        <Text>Reviews</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <PagerView style={styles.viewPager} initialPage={0} onPageSelected={(e) => setCurrentPage(e.nativeEvent.position)} ref={pagerRef}>
                <View style={styles.container}>
                    <View style={styles.topHalf}>
                        <View style={{ display: 'flex', alignItems: 'center' }}>
                            <Text style={{ fontSize: 22, fontWeight: 700 }}>5 harmful ingredients found</Text>
                        </View>
                        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
                            <View style={styles.riskLevel}>
                                <Text style={{ fontSize: 60 }}>1</Text>
                                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <CircleRisk circleColor={'#ED5B55'} />
                                    <CircleRisk circleColor={'#ED5B55'} />
                                    <CircleRisk circleColor={'#ED5B55'} />
                                </View>
                                <Text style={{ fontSize: 16 }}>High Risk</Text>
                            </View>
                            <View style={styles.verticalSeparator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
                            <View style={styles.riskLevel}>
                                <Text style={{ fontSize: 60 }}>2</Text>
                                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <CircleRisk circleColor={'#FB953C'} />
                                    <CircleRisk circleColor={'#FB953C'} />
                                    <CircleRisk circleColor={'#AEB5BD'} />
                                </View>
                                <Text style={{ fontSize: 16 }}>Medium Risk</Text>
                            </View>
                            <View style={styles.verticalSeparator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
                            <View style={styles.riskLevel}>
                                <Text style={{ fontSize: 60 }}>1</Text>
                                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <CircleRisk circleColor={'#F6CC29'} />
                                    <CircleRisk circleColor={'#AEB5BD'} />
                                    <CircleRisk circleColor={'#AEB5BD'} />
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
                <View style={styles.page} key="1">

                    <View style={styles.topHalf}>
                        <View style={{ display: 'flex', alignItems: 'center' }}>
                            <Text style={{ fontSize: 22, fontWeight: 700 }}>Reviews from individuals who share similar skin conditions and have previously tried this product</Text>
                        </View>
                        <View>
                            <View style={styles.effectiveness}>
                                <View >
                                    <Text>Effectiveness Rating</Text>
                                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                        <Image source={require('../../assets/images/5stars.png')}></Image>
                                        <Text style={{ marginLeft: 10 }}>2</Text>
                                    </View>
                                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                        <Image source={require('../../assets/images/4stars.png')}></Image>
                                        <Text style={{ marginLeft: 10 }}>0</Text>
                                    </View>
                                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                        <Image source={require('../../assets/images/3stars.png')}></Image>
                                        <Text style={{ marginLeft: 10 }}>0</Text>
                                    </View>
                                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                        <Image source={require('../../assets/images/2stars.png')}></Image>
                                        <Text style={{ marginLeft: 10 }}>0</Text>
                                    </View>
                                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                        <Image source={require('../../assets/images/1stars.png')}></Image>
                                        <Text style={{ marginLeft: 10 }}>1</Text>
                                    </View>
                                </View>
                                <View>
                                    <Text style={{ fontWeight: 700, fontSize: 18, color: '#3E5B20' }}>3.7/5.0</Text>
                                    <Text>3 reviews</Text>
                                </View>
                            </View>
                            <Text style={{ fontSize: 18, paddingVertical: 5 }}>Reviews</Text>
                            <View style={styles.review}>
                                <Text style={{fontWeight: 700}}>Beatrice</Text>
                                <Image source={require('../../assets/images/5stars.png')}></Image>
                                <Text>This product smells really nice. It helps with reducing the size of my pores</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </PagerView>
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
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
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
    viewPager: {
        flex: 1,
    },
    page: {
        // justifyContent: 'center',
        // alignItems: 'center',
    },
    effectiveness: {
        display: 'flex',
        flexDirection: 'row',
        borderColor: '#E9F4E4',
        borderWidth: 2,
        borderRadius: 10,
        padding: 20,
        justifyContent: 'space-between',
        marginVertical: 10,
        alignItems: 'center'
    },
    review: {
        display: 'flex',
        padding: 20,
        backgroundColor: '#E9F4E4',
        borderRadius: 15
    },
});