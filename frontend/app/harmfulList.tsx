import { StyleSheet, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Accordion, AccordionItem, AccordionHeader, AccordionTrigger, AccordionContent,  AccordionTitleText,
AccordionIcon, AccordionContentText, GluestackUIStyledProvider  } from
'@gluestack-ui/themed';

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";

export default function HarmfulListScreen() {
  const navigation = useNavigation();

  return (
  <GluestackUIStyledProvider >
    <Accordion
      variant="unfilled"
      size="sm"
      m="$5"
      borderWidth={1}
      borderColor="$borderLight300"
      $dark-borderColor="$borderDark700"
      width="80%"
      maxWidth={640}
    >
      <AccordionItem value="a">
        <AccordionHeader
          sx={{
            backgroundColor: "$backgroundLight0",
            _dark: {
              backgroundColor: "$backgroundDark950",
            },
          }}
        >
          <AccordionTrigger>
            {({ isExpanded }) => (
              <>
                {isExpanded ? (
                  <AccordionIcon as={MinusIcon} />
                ) : (
                  <AccordionIcon as={PlusIcon} />
                )}
                <AccordionTitleText ml="$3">USA</AccordionTitleText>
              </>
            )}
          </AccordionTrigger>
        </AccordionHeader>
        <AccordionContent pb="$0">
          <Accordion
            width="100%"
            shadowColor="transparent"
            borderWidth={1}
            sx={{
              borderColor: "$borderLight300",
              backgroundColor: "$backgroundLight0",
              _dark: {
                borderColor: "$borderDark700",
                backgroundColor: "$backgroundDark950",
              },
            }}
          >
            <AccordionItem value="b">
              <AccordionHeader>
                <AccordionTrigger>
                  {({ isExpanded }) => (
                    <>
                      {isExpanded ? (
                        <AccordionIcon as={MinusIcon} />
                      ) : (
                        <AccordionIcon as={PlusIcon} />
                      )}
                      <AccordionTitleText ml="$3">
                        California
                      </AccordionTitleText>
                    </>
                  )}
                </AccordionTrigger>
              </AccordionHeader>
              <AccordionContent>
                <AccordionContentText>
                  Capital city of California is Sacramento. California has a GDP
                  of 2.89 trillion dollars and follows Pacific Standard Time
                  zone.
                </AccordionContentText>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <Accordion
            width="100%"
            shadowColor="transparent"
            mt="$5"
            sx={{
              backgroundColor: "$backgroundLight0",
              _dark: {
                backgroundColor: "$backgroundDark950",
              },
            }}
          >
            <AccordionItem value="c">
              <AccordionHeader>
                <AccordionTrigger>
                  {({ isExpanded }) => (
                    <>
                      {isExpanded ? (
                        <AccordionIcon as={MinusIcon} />
                      ) : (
                        <AccordionIcon as={PlusIcon} />
                      )}
                      <AccordionTitleText ml="$3">Nevada</AccordionTitleText>
                    </>
                  )}
                </AccordionTrigger>
              </AccordionHeader>
              <AccordionContent>
                <AccordionContentText>
                  Nevada is located in a mountainous region that includes vast
                  semiarid grasslands and sandy alkali deserts. It is the most
                  arid state of the country.
                </AccordionContentText>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
    </GluestackUIStyledProvider>
  )
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
