import React from "react";
import { StyleSheet, Pressable } from "react-native";
import { Text, View } from "@/components/Themed";

export default function SkinQuiz1() {
  const [selectedOptions, setSelectedOptions] = React.useState<
    Array<number | null>
  >(Array(4).fill(null));
  const [currentQuestionIndex, setCurrentQuestionIndex] =
    React.useState<number>(0);
  const [questions] = React.useState([
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

  const handleOptionPress = (optionIndex: number) => {
    const newSelectedOptions = [...selectedOptions];
    newSelectedOptions[currentQuestionIndex] = optionIndex;
    setSelectedOptions(newSelectedOptions);
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) =>
      Math.min(prevIndex + 1, questions.length - 1),
    );
  };

  const handlePreviousQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {questions[currentQuestionIndex]?.question}
      </Text>

      <View style={styles.optionsContainer}>
        {questions[currentQuestionIndex]?.options.map((option, index) => (
          <Pressable
            key={index}
            style={({ pressed }) => [
              styles.option,
              selectedOptions[currentQuestionIndex] === index &&
                styles.selectedOption,
              pressed && styles.pressedOption,
            ]}
            onPress={() => handleOptionPress(index)}
          >
            <Text style={styles.optionText}>{option}</Text>
          </Pressable>
        ))}
      </View>

      <View style={styles.buttonContainer}>
        {currentQuestionIndex !== 0 && (
          <Pressable
            style={({ pressed }) => [
              styles.button,
              styles.backButton,
              pressed && styles.backButtonPressed,
            ]}
            onPress={handlePreviousQuestion}
          >
            <Text style={styles.buttonText}>Back</Text>
          </Pressable>
        )}

        <Pressable
          style={({ pressed }) => [
            styles.button,
            styles.nextButton,
            pressed && styles.nextButtonPressed,
            { marginLeft: currentQuestionIndex === 0 ? "auto" : 0 }, // Align to right if it's the first question
            {
              opacity: selectedOptions[currentQuestionIndex] === null ? 0.5 : 1,
            },
          ]}
          onPress={
            currentQuestionIndex === questions.length - 1
              ? () => console.log("Submit", selectedOptions)
              : handleNextQuestion
          }
          disabled={selectedOptions[currentQuestionIndex] === null}
        >
          <Text style={styles.buttonText}>
            {currentQuestionIndex === questions.length - 1
              ? "Submit"
              : "Next Question"}
          </Text>
        </Pressable>
      </View>
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
    width: "80%",
    marginBottom: 30,
    textAlign: "center",
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
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    marginTop: 20,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: "#0D332A",
  },
  backButton: {
    marginRight: 10,
  },
  backButtonPressed: {
    opacity: 0.5,
  },
  nextButton: {},
  nextButtonPressed: {
    opacity: 0.5,
  },
  submitButton: {},
  submitButtonPressed: {
    opacity: 0.5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});
