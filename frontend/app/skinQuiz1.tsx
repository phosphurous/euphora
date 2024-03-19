import React from "react";
import { StyleSheet, Pressable } from "react-native";
import { Text, View } from "@/components/Themed";

export default function SkinQuiz1() {
  const [selectedBox, setSelectedBox] = React.useState<number | null>(null);
  const [count, setCount] = React.useState<number>(0);
  const [questions, setQuestions] = React.useState([
    {
      id: 1,
      question: "Assess your skin moisturization needs",
      options: [
        "I can use any soap to wash my face without developing dryness",
        "I do not apply any product after cleansing",
        "I never or only occasionally apply a moisturiser",
        "I apply a moisturiser to my face once a day",
      ],
    },
    {
      id: 2,
      question: "What most closely describes the look of your pores?",
      options: [
        "Large and visible all over",
        "Medium-sized all over",
        "Small, not easily noticed all over",
        "Larger or medium and only visible in the T-zone",
      ],
    },
    {
      id: 3,
      question: "When does your skin look red?",
      options: [
        "Whenever and wherever I use new products",
        "Anytime I have blemishes",
        "Sometimes, but only around my cheeks",
        "More often than I care to admit",
      ],
    },
    {
      id: 4,
      question: "I would describe the shine of my skin like this:",
      options: [
        "Shiny in my T-zone, but dull on my cheeks",
        "Bright like a diamond",
        "Dull everywhere",
        "I get more stinging than shine",
      ],
    },
  ]);

  const toggleColor = (index: number | null) => {
    if (index === null) return;
    setSelectedBox(index);
  };

  const onNextQuestion = () => {
    setCount((prevCount) => Math.min(prevCount + 1, questions.length - 1)); // Ensure not to go beyond the last question
    setSelectedBox(null); // Reset selected option
  };

  const onPreviousQuestion = () => {
    setCount((prevCount) => Math.max(prevCount - 1, 0)); // Ensure not to go before the first question
    setSelectedBox(null); // Reset selected option
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{questions[count]?.question}</Text>
      <View style={styles.separator} />

      <View style={styles.optionsContainer}>
        {questions[count]?.options.map((item, index) => (
          <Pressable
            style={({ pressed }) => [
              styles.option,
              selectedBox === index && styles.selectedOption,
              pressed && styles.pressedOption,
            ]}
            key={index}
            onPress={() => toggleColor(index)}
          >
            <Text style={styles.optionText}>{item}</Text>
          </Pressable>
        ))}
      </View>

      {/* Button to navigate to the previous question */}
      <Pressable
        style={({ pressed }) => [
          styles.backButton,
          pressed && styles.backButtonPressed,
        ]}
        onPress={onPreviousQuestion}
      >
        <Text style={styles.backButtonText}>Back</Text>
      </Pressable>

      {/* Button to navigate to the next question */}
      <Pressable
        style={({ pressed }) => [
          styles.nextButton,
          pressed && styles.nextButtonPressed,
        ]}
        onPress={onNextQuestion}
      >
        <Text style={styles.nextButtonText}>Next Question</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
    backgroundColor: "gray", // Add your color
  },
  optionsContainer: {
    width: "80%",
  },
  option: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "gray",
  },
  selectedOption: {
    backgroundColor: "#E9F4E4",
  },
  pressedOption: {
    opacity: 0.5,
  },
  optionText: {
    fontSize: 16,
  },
  backButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: "#007AFF",
  },
  backButtonPressed: {
    opacity: 0.5,
  },
  backButtonText: {
    color: "white",
    fontSize: 16,
  },
  nextButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: "#007AFF",
  },
  nextButtonPressed: {
    opacity: 0.5,
  },
  nextButtonText: {
    color: "white",
    fontSize: 16,
  },
});
