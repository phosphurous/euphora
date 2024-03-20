import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  Modal,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import React from "react";
import { useState, useEffect } from "react";
import DropdownComponent from "@/components/Dropdown";

type ItemProps = {
  productType: string;
  productName: string;
  morningRoutine: boolean;
  eveningRoutine: boolean;
};
const Item = ({
  productType,
  productName,
  morningRoutine,
  eveningRoutine,
}: ItemProps) => (
  <View style={styles.itemContainer}>
    <Text>{productType}</Text>
    <Text>{productName}</Text>
    <Text>{morningRoutine ? "yes" : "no"}</Text>
    <Text>{eveningRoutine ? "yes" : "no"}</Text>
  </View>
);

const productTypeOptions = [
  { label: "Cleanser", value: "Cleanser" },
  { label: "Eyecream", value: "Eyecream" },
  { label: "Exfoliator", value: "Exfoliator" },
  { label: "Face Oil", value: "Face Oil" },
  { label: "Mask", value: "Mask" },
  { label: "Moisturizer", value: "Moisturizer" },
  { label: "Serum", value: "Serum" },
  { label: "Sunscreen", value: "Sunscreen" },
  { label: "Toner", value: "Toner" },
];

const CircleCheckbox = ({ label, checked, onChange }) => {
  return (
    <TouchableOpacity onPress={() => onChange(!checked)}>
      <View style={styles.checkboxContainer}>
        <View style={[styles.checkbox, checked && styles.checked]}>
          {checked && <View style={styles.innerCircle} />}
        </View>
        <Text>{label}</Text>
      </View>
    </TouchableOpacity>
  );
};

const FrequencyCheckbox = ({ label, checked, onChange }) => {
  return (
    <TouchableOpacity onPress={() => onChange(!checked)}>
      <View style={styles.checkboxContainer}>
        <View style={[styles.checkbox, checked && styles.checked]}>
          <Text>{label}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default function EditRoutineScreen() {
  const [openModal, setOpenModal] = useState(false);
  const [productType, setProductType] = useState("");
  const [productName, setProductName] = useState("");
  const [morningRoutine, setMorningRoutine] = useState(false);
  const [eveningRoutine, setEveningRoutine] = useState(false);
  const [selectedDays, setSelectedDays] = useState([]);

  const toggleDay = (day) => {
    const index = selectedDays.indexOf(day);
    if (index === -1) {
      setSelectedDays([...selectedDays, day]);
    } else {
      const newSelectedDays = [...selectedDays];
      newSelectedDays.splice(index, 1);
      setSelectedDays(newSelectedDays);
    }
  };

  useEffect(() => {
    // console.log("open?", openModal);
  }, [openModal]);

  const handleSelectProductType = (value) => {
    setProductType(value);
    // console.log("productType:", value);
  };
  const handleSubmit = () => {
    console.log("Product Type:", productType);
    console.log("Product Name:", productName);
    console.log("Morning Routine:", morningRoutine);
    console.log("Evening Routine:", eveningRoutine);
    console.log("Frequency:", selectedDays);
  };
  return (
    <View style={styles.container}>
      <Modal
        visible={openModal}
        onRequestClose={() => {
          setOpenModal(false);
        }}
        animationType="slide"
        transparent={true}
      >
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        >
          <View
            style={{
              width: 350,
              height: 350,
              backgroundColor: "#FFFFFF",
              borderRadius: 20,
              padding: 20,
            }}
          >
            <Text style={{ fontWeight: "700", marginBottom: 5 }}>
              Add a product
            </Text>

            <Text>Product Type</Text>
            <View style={styles.dropdownContainer}>
              <DropdownComponent
                options={productTypeOptions}
                onSelect={handleSelectProductType}
              />
            </View>

            <Text>Product Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Product Name"
              value={productName}
              onChangeText={setProductName}
            />

            <Text>Add to routine</Text>
            <CircleCheckbox
              label="Morning routine"
              checked={morningRoutine}
              onChange={setMorningRoutine}
            />
            <CircleCheckbox
              label="Evening routine"
              checked={eveningRoutine}
              onChange={setEveningRoutine}
            />

            <Text>Frequency</Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                marginBottom: 10,
              }}
            >
              <FrequencyCheckbox
                label="M"
                checked={selectedDays.includes("Monday")}
                onChange={() => toggleDay("Monday")}
              />
              <FrequencyCheckbox
                label="T"
                checked={selectedDays.includes("Tuesday")}
                onChange={() => toggleDay("Tuesday")}
              />
              <FrequencyCheckbox
                label="W"
                checked={selectedDays.includes("Wednesday")}
                onChange={() => toggleDay("Wednesday")}
              />
              <FrequencyCheckbox
                label="T"
                checked={selectedDays.includes("Thursday")}
                onChange={() => toggleDay("Thursday")}
              />
              <FrequencyCheckbox
                label="F"
                checked={selectedDays.includes("Friday")}
                onChange={() => toggleDay("Friday")}
              />
              <FrequencyCheckbox
                label="S"
                checked={selectedDays.includes("Saturday")}
                onChange={() => toggleDay("Saturday")}
              />
              <FrequencyCheckbox
                label="S"
                checked={selectedDays.includes("Sunday")}
                onChange={() => toggleDay("Sunday")}
              />
            </View>
            <View
              style={{
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "row",
              }}
            >
              <TouchableOpacity onPress={() => setOpenModal(false)}>
                <Text>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleSubmit}
                style={{
                  backgroundColor: "#3E5B20",
                  borderRadius: 48,
                  paddingHorizontal: 8,
                  paddingVertical: 4,
                }}
              >
                <Text style={{ color: "#FFFFFF" }}>Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <View
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Text style={styles.subTitle}>Products list</Text>
        <View
          style={{
            paddingTop: 50,
            display: "flex",
            flexDirection: "row",
            paddingRight: 30,
            alignItems: "center",
          }}
        >
          <TouchableWithoutFeedback onPress={() => setOpenModal(true)}>
            <Image
              source={require("../../assets/images/add.png")}
              style={{ marginRight: 15 }}
            ></Image>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback>
            <Image source={require("../../assets/images/list.png")}></Image>
          </TouchableWithoutFeedback>
        </View>
      </View>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <Item
            productType={item.productType}
            productName={item.productName}
            morningRoutine={item.morningRoutine}
            eveningRoutine={item.eveningRoutine}
          />
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  subTitle: {
    fontSize: 16,
    fontWeight: "bold",
    paddingTop: 50,
    paddingLeft: 30,
  },
  itemContainer: {
    backgroundColor: "#E9F4E4",
    borderRadius: 20,
    marginVertical: 5,
    marginHorizontal: 20,
    padding: 20,
  },
  dropdownContainer: {
    borderWidth: 1,
    borderColor: "#E9F4E4",
    borderRadius: 5,
    marginBottom: 10,
  },
  input: {
    borderWidth: 0.5,
    paddingHorizontal: 8,
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#3E5B20",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  innerCircle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#3E5B20",
  },
  checked: {
    backgroundColor: "#E9F4E4",
  },
});

const data = [
  {
    id: 1,
    productType: "Cleanser",
    productName: "Kose Sekkisei White Milky Wash",
    morningRoutine: true,
    eveningRoutine: false,
    frequency: {
      Monday: true,
      Tuesday: true,
      Wednesday: true,
      Thursday: true,
      Friday: true,
      Saturday: true,
      Sunday: true,
    },
  },
  {
    id: 2,
    productType: "Toner",
    productName: "CeraVe Hydrating Toner",
    morningRoutine: true,
    eveningRoutine: true,
    frequency: {
      Monday: true,
      Tuesday: false,
      Wednesday: false,
      Thursday: true,
      Friday: true,
      Saturday: true,
      Sunday: true,
    },
  },
];
