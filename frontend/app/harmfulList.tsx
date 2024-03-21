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
  ChevronUpIcon,
  AccordionContentText,
  GluestackUIStyledProvider,
  StyledProvider,
} from "@gluestack-ui/themed";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";

export default function HarmfulListScreen() {
  const navigation = useNavigation();

  return (
    <StyledProvider>
      <Accordion
        m="$5"
        width="90%"
        size="md"
        variant="filled"
        type="single"
        isCollapsible={true}
        isDisabled={false}
      >
        <AccordionItem value="a">
          <AccordionHeader>
            <AccordionTrigger>
              {({ isExpanded }) => {
                return (
                  <>
                    <AccordionTitleText>
                      How do I place an order?
                    </AccordionTitleText>
                    {/*                     {isExpanded ? ( */}
                    {/*                       <AccordionIcon as={ChevronUpIcon} ml="$3"/> */}
                    {/*                     ) : ( */}
                    {/*                       <AccordionIcon as={ChevronDownIcon} ml="$3"/> */}
                    {/*                     )} */}
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
                    {/*                     {isExpanded ? ( */}
                    {/*                       <AccordionIcon as={ChevronUpIcon} ml="$3"/> */}
                    {/*                     ) : ( */}
                    {/*                       <AccordionIcon as={ChevronDownIcon} ml="$3"/> */}
                    {/*                     )} */}
                  </>
                );
              }}
            </AccordionTrigger>
          </AccordionHeader>
          <AccordionContent>
            <AccordionContentText>
              We accept all major credit cards, including Visa, Mastercard, and
              American Express. We also support payments through PayPal.
            </AccordionContentText>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </StyledProvider>
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
    fontSize: 16,
    textAlign: "center",
    paddingHorizontal: 12,
    flex: 1,
  },
});
