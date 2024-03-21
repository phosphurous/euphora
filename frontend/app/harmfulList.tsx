import { StyleSheet, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionTrigger,
  AccordionContent,
  AccordionTitleText,
  AccordionIcon,
  AccordionContentText,
  GluestackUIStyledProvider,
  StyledProvider,
} from "@gluestack-ui/themed";
import { ChevronUpIcon } from "lucide-react-native";
import { ChevronDownIcon } from "lucide-react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";

export default function HarmfulListScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Accordion
        m="$5"
        width="80%"
        size="lg"
        variant="unfilled"
        type="single"
        borderWidth={1}
        isCollapsible={true}
        isDisabled={false}
        style={styles.body}
      >
        <AccordionItem value="a">
          <AccordionHeader
            backgroundColor="white"
            fontFamily="Inter-SemiBold"
            fontSize={30}
          >
            <AccordionTrigger>
              {({ isExpanded }) => {
                return (
                  <>
                    <AccordionTitleText>
                      How do I place an order?
                    </AccordionTitleText>
                    {isExpanded ? (
                  <AccordionIcon as={ChevronUpIcon} />
                ) : (
                  <AccordionIcon as={ChevronDownIcon} />
                )}
                  </>
                );
              }}
            </AccordionTrigger>
          </AccordionHeader>
          <AccordionContent>
            <AccordionContentText>
              To place an order, simply select the products you want, proceed to
              checkout, provide shipping and payment information, and finalize
              your purchase.
            </AccordionContentText>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="b">

          <AccordionHeader>
            <AccordionTrigger>
              {({ isExpanded }) => {
                return (
                  <>
                    <AccordionTitleText>
                      What payment methods do you accept?
                    </AccordionTitleText>
                  </>
                );
              }}
            </AccordionTrigger>
          </AccordionHeader>

          <AccordionContent pb="$0">
            <AccordionContentText>
              Text 1
            </AccordionContentText>
            <AccordionContentText>
              Text 2
            </AccordionContentText>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  selectedOptionsRow: {
    flexDirection: "row",
    alignItems: "center",
    width: "80%",
  },
  selectedOptionBubble: {
    backgroundColor: "white",
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 6,
    margin: 5,
    flex: 1,
  },
  body: {
    fontFamily: "Inter-SemiBold",
    fontSize: 32,
    textAlign: "center",
    paddingHorizontal: 12,
    flex: 1,
  },
});
