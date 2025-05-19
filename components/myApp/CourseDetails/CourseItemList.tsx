import { formatAmount } from "@/utils/functions";
import { supabase } from "@/utils/supabase";
import { CategoryData, CategoryItem } from "@/utils/types";
import { EvilIcons } from "@expo/vector-icons";
import { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Linking,
  StyleSheet,
} from "react-native";
import colors from "../colors";

type CourseItemListProps = {
  categoryData: CategoryData;
  setUpdateRecord: () => void;
};

export default function CourseItemList(props: CourseItemListProps) {
  const [expandItem, setExpandItem] = useState<number>();

  const onDeleteItem = async (id: number) => {
    const { error } = await supabase
      .from("CategoryItems")
      .delete()
      .eq("id", id);

    props.setUpdateRecord();
  };

  const openUrl = (url: string) => {
    if (url) {
      Linking.openURL(url);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Item List</Text>
      <View style={styles.listContainer}>
        {props.categoryData.CategoryItems?.length > 0 ? (
          props.categoryData.CategoryItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() =>
                setExpandItem((prev) => (prev === index ? undefined : index))
              }
              style={styles.itemContainer}
            >
              <View style={styles.itemContent}>
                <Image source={{ uri: item.image }} style={styles.itemImage} />
                <View style={styles.textContainer}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemUrl} numberOfLines={2}>
                    {item.url}
                  </Text>
                </View>
                <Text style={styles.itemCost}>
                  {item.cost.toLocaleString("en-NG", {
                    style: "currency",
                    currency: "NGN", // Change to Nigerian Naira
                    minimumFractionDigits: 2, // Adjust for desired decimal places
                  })}
                </Text>
              </View>
              {expandItem === index && (
                <View style={styles.actionsContainer}>
                  <TouchableOpacity onPress={() => onDeleteItem(item.id)}>
                    <EvilIcons name="trash" size={34} color="red" />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => openUrl(item.url)}>
                    <EvilIcons name="external-link" size={34} color="blue" />
                  </TouchableOpacity>
                </View>
              )}
              {index !== props.categoryData.CategoryItems.length - 1 && (
                <View style={styles.separator} />
              )}
            </TouchableOpacity>
          ))
        ) : (
          <Text style={styles.emptyText}>No Item Found</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  title: {
    fontFamily: "outfit-bold",
    fontSize: 20,
    marginBottom: 16,
  },
  listContainer: {
    marginTop: 16,
  },
  itemContainer: {
    marginTop: 12,
  },
  itemContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemImage: {
    width: 90,
    height: 90,
    borderRadius: 16,
  },
  textContainer: {
    flex: 1,
    marginLeft: 12,
  },
  itemName: {
    fontSize: 20,
    fontFamily: "outfit-bold",
  },
  itemUrl: {
    fontFamily: "outfit",
    color: colors.greyDarker,
  },
  itemCost: {
    fontSize: 16,
    fontFamily: "outfit-bold",
    marginLeft: 12,
  },
  actionsContainer: {
    flexDirection: "row",
    gap: 12,
    justifyContent: "flex-end",
    marginTop: 8,
  },
  separator: {
    borderBottomWidth: 0.5,
    borderColor: colors.grey,
    marginTop: 12,
  },
  emptyText: {
    fontFamily: "outfit-bold",
    fontSize: 24,
    color: colors.grey,
  },
});
