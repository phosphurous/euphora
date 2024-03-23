import {
    Text,
    StyleSheet,
    Image,
    FlatList,
    TouchableOpacity,
    Modal,
    ScrollView,
    ActivityIndicator,
} from "react-native";
import React from "react";
import { View } from "@/components/Themed";
import { useState, useEffect, useRef } from "react";
import PagerView from "react-native-pager-view";
import axios from "axios";
import { BACKEND_URL } from "@env";
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
const CircleRisk = ({ circleColor }) => {
    return (
        <TouchableOpacity
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <View style={styles.checkboxContainer}>
                <View
                    style={{
                        width: 16,
                        height: 16,
                        borderRadius: 10,
                        borderWidth: 1,
                        borderColor: "#FFFFFF",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: circleColor,
                        marginHorizontal: 2,
                    }}
                ></View>
            </View>
        </TouchableOpacity>
    );
};

type IngredientItemProps = {
    name: string;
    confidence: number;
};

const IngredientItem = ({ name, confidence }: IngredientItemProps) => {
    const [ingredientInfo, setIngredientInfo] = useState<string | null>(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [loading, setLoading] = useState<boolean>(false);

    const handleClick = async (ingredientName: string) => {
        setLoading(true);
        try {
            const response = await axios.get(
                `${BACKEND_URL}/api/v1/ingredients/1/AI?ingredient_name=${ingredientName}`,
            );
            setIngredientInfo(response.data.response);
        } catch (error) {
            console.error("Error fetching data:", error);
            setIngredientInfo("Error fetching ingredient info");
        } finally {
            setLoading(false);
        }
    };

    let backgroundColor, textColor;
    if (confidence > 0.7 && confidence <= 1.0) {
        backgroundColor = '#FFCACA'; // Reddish background
        textColor = '#D3180C'; // Red text
    } else if (confidence > 0.3 && confidence <= 0.7) {
        backgroundColor = '#FFD7B3'; // Orange background
        textColor = '#A05E03'; // Orange text
    } else if (confidence >= 0 && confidence <= 0.3) {
        backgroundColor = '#FFFBD7'; // Yellow background
        textColor = '#A05E03'; // Yellow text
    } else {
        backgroundColor = '#FFFFFF'; // Default background
        textColor = '#000000'; // Default text color
    }
    const formattedText = ingredientInfo?.split('**').map((part, index) => {
        if (index % 2 === 1) {
            return <Text key={index} style={{ fontWeight: 'bold' }}>{part}</Text>;
        } else {
            const bulletPointText = part.replace(/\*/g, '\u2022 ');
            return <Text key={index}>{bulletPointText}</Text>;
        }
    });
    return (
        <TouchableOpacity onPress={() => { setModalVisible(true); handleClick(name) }}>
            <View style={[styles.ingredientBox, { backgroundColor }]}>
                <Text style={{ color: textColor, fontWeight: '700' }}>{name}</Text>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(false);
                    }}
                >
                    <View style={styles.modalView1}>
                        {loading ? (
                            <View style={styles.loadingModal}>
                                <Text style={{ marginVertical: 30 }}>Loading...please wait</Text><ActivityIndicator size="small" color="#0000ff" />
                            </View>) :
                            (<View style={styles.modalView2}>
                                <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', paddingRight: 20 }}>
                                    <Text style={{ fontSize: 18, fontWeight: '700', marginBottom: 10 }}>{name}</Text>
                                    {/* <Text>Confidence Level: {confidence.toFixed(3)}</Text> */}
                                    <Text>{formattedText}</Text>
                                </ScrollView>
                                <TouchableOpacity onPress={() => setModalVisible(false)} style={{ backgroundColor: '#3E5B20', marginTop: 10, borderRadius: 5, paddingVertical: 5, paddingHorizontal: 8 }}>
                                    <Text style={{ color: 'white' }}>Close</Text>
                                </TouchableOpacity>
                            </View>)}


                    </View>
                </Modal>
            </View>
        </TouchableOpacity>
    )
}

type ReviewItemProps = {
    Profile: any;
    negativeReaction: boolean;
    rating: number;
    description: string;
    reviewerName: string;
};
const ReviewItem = ({
    rating,
    description,
    negativeReaction,
    reviewerName,
}: ReviewItemProps) => {
    const getStarImage = (rating: number) => {
        switch (rating) {
            case 1:
                return require("../assets/images/1stars.png");
            case 2:
                return require("../assets/images/2stars.png");
            case 3:
                return require("../assets/images/3stars.png");
            case 4:
                return require("../assets/images/4stars.png");
            case 5:
                return require("../assets/images/5stars.png");
            default:
                return require("../assets/images/5stars.png"); // Default to 5 stars
        }
    };
    return (
        <View style={styles.review}>
            <Text style={{ fontWeight: "700" }}>{reviewerName}</Text>
            <Image source={getStarImage(rating)}></Image>
            <Text style={{ color: "grey", marginBottom: 2 }}>
                {negativeReaction == true
                    ? "Experienced a negative reaction"
                    : "Did not experience any negative reactions"}
            </Text>
            <Text>{description}</Text>
        </View>
    );
};

const Analysis = () => {

    const navigation = useNavigation();
    const pagerRef = useRef(null);
    const [currentPage, setCurrentPage] = useState(0);
    const setPage = (page) => {
        if (pagerRef.current) {
            pagerRef.current.setPage(page);
            setCurrentPage(page);
        }
    };
    const [reviews, setReviews] = useState<ReviewItemProps[]>([]);
    const [ingredients, setIngredients] = useState<IngredientItemProps[]>([])
    const [conditions, setConditions] = useState([]);

    // handle information taken from scan.tsx
    const route = useRoute();
    let { scanIngredients } = route.params;
    scanIngredients = scanIngredients.filter((item) => item?.name !== "")
    console.log("scanIngredients:", scanIngredients);

    useEffect(() => {
        fetchReviews();
        fetchConditions();
    }, []);

    const fetchConditions = async () => {
        const API_URL = `${BACKEND_URL}/api/v1/profile/1/get_profile`;
        try {
            const response = await axios.get(API_URL);
            // console.log("response:", response.data.condition);
            setConditions(response.data.condition)
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    const fetchReviews = async () => {
        const API_URL = `${BACKEND_URL}/api/v1/products/1/reviews`;
        try {
            const requestBody = { conditions };
            const response = await axios.post(API_URL, requestBody);
            setReviews(response.data?.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    // Calculate number of ratings with 1, 2, 3, 4, 5 stars
    const ratingsCount: number[] = reviews.reduce(
        (acc, review) => {
            const { rating } = review;
            acc[rating - 1] += 1;
            return acc;
        },
        [0, 0, 0, 0, 0],
    );

    // Calculate mean rating out of 5
    const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
    const meanRating = totalRating / reviews.length;

    // Calculate percentage of reviews with negative reactions
    const negativeReactionsCount = reviews.filter(
        (review) => review?.negativeReaction,
    ).length;
    const percentageNegativeReactions =
        (negativeReactionsCount / reviews.length) * 100;


    let sortedIngredients = scanIngredients.sort((a, b) => {
        return b.confidence - a.confidence;
    });

    const counts = sortedIngredients.reduce((acc, cur) => {
        if (cur.confidence > 0.7 && cur.confidence <= 1.0) {
            acc.highRiskCount++;
        } else if (cur.confidence > 0.3 && cur.confidence <= 0.7) {
            acc.mediumRiskCount++;
        } else if (cur.confidence >= 0 && cur.confidence <= 0.3) {
            acc.lowRiskCount++;
        }
        return acc;
    }, { highRiskCount: 0, mediumRiskCount: 0, lowRiskCount: 0 });
    return (
        <View style={{ flex: 1 }}>
            <View style={styles.topHalf}>
                <View style={{ display: 'flex', flexDirection: 'row', backgroundColor: '#E9F4E4', justifyContent: 'space-evenly', paddingVertical: 5, borderRadius: 10 }}>
                    <TouchableOpacity onPress={() => setPage(0)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 5, borderRadius: 5, flexBasis: '45%', backgroundColor: currentPage === 0 ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0)' }}>
                        <Text>Ingredients</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setPage(1)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 5, borderRadius: 5, flexBasis: '45%', backgroundColor: currentPage === 1 ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0)' }}>
                        <Text>Reviews</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <PagerView style={styles.viewPager} initialPage={0} onPageSelected={(e) => setCurrentPage(e.nativeEvent.position)} ref={pagerRef}>
                <View style={styles.container}>
                    <View style={styles.topHalf}>
                        <View style={{ display: 'flex', alignItems: 'center' }}>
                            <Text style={{ fontSize: 22, fontWeight: '700' }}>Harmful ingredients found</Text>
                        </View>
                        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
                            <View style={styles.riskLevel}>
                                <Text style={{ fontSize: 60 }}>{counts.highRiskCount}</Text>
                                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <CircleRisk circleColor={'#ED5B55'} />
                                    <CircleRisk circleColor={'#ED5B55'} />
                                    <CircleRisk circleColor={'#ED5B55'} />
                                </View>
                                <Text style={{ fontSize: 16 }}>High Risk</Text>
                            </View>
                            <View style={styles.verticalSeparator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
                            <View style={styles.riskLevel}>
                                <Text style={{ fontSize: 60 }}>{counts.mediumRiskCount}</Text>
                                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <CircleRisk circleColor={'#FB953C'} />
                                    <CircleRisk circleColor={'#FB953C'} />
                                    <CircleRisk circleColor={'#AEB5BD'} />
                                </View>
                                <Text style={{ fontSize: 16 }}>Medium Risk</Text>
                            </View>
                            <View style={styles.verticalSeparator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
                            <View style={styles.riskLevel}>
                                <Text style={{ fontSize: 60 }}>{counts.lowRiskCount}</Text>
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
                        <Text>Tap on ingredients to view potential side effects</Text>
                        <FlatList
                            data={sortedIngredients}
                            renderItem={({ item }) =>
                                <IngredientItem name={item.name} confidence={item.confidence} />
                            }
                        />
                    </View>
                </View>
                <View style={styles.page} key="1">

                    <View style={styles.topHalf}>
                        <Text>Product unknown from your scan</Text>
                        <Text>Please search for your products to read reviews</Text>
                        <TouchableOpacity style={{
                            backgroundColor: "#D1E543",
                            paddingVertical: 12,
                            paddingHorizontal: 20,
                            borderRadius: 10,
                            marginTop: 10,
                            marginBottom: 20
                        }}
                            onPress={() => navigation.navigate("findProduct")}
                        >
                            <Text>Search for product &gt;</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </PagerView>
        </View>
    );
};

export default Analysis;

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
        paddingBottom: 5,
        paddingTop: 20
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
        paddingTop: 40,
        marginTop: 15
    },
    verticalSeparator: {
        height: 130,
        width: '0.5%'
    },
    ingredientBox: {
        borderRadius: 15,
        padding: 20,
        marginVertical: 10,
        width: 280
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
        flexDirection: 'column',
        borderColor: '#E9F4E4',
        borderWidth: 2,
        borderRadius: 10,
        padding: 20,
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    review: {
        display: 'flex',
        padding: 20,
        backgroundColor: '#E9F4E4',
        borderRadius: 15
    },
    modalView1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView2: {
        marginHorizontal: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        paddingHorizontal: 35,
        paddingTop: 35,
        paddingBottom: 10,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        maxHeight: '80%',
    },
    loadingModal: {
        backgroundColor: '#E9F4E4',
        height: 200,
        width: 200,
        marginHorizontal: 20,
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
