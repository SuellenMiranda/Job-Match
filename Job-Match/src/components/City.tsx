import React from "react";
import { Text, TouchableOpacity } from "react-native";
import Icon from "./Icon";
import styles, { DARK_GRAY } from "../../assets/styles";

const City = ({ localizacao }: { localizacao: string }) => (
    <TouchableOpacity style={styles.city}>
        <Text style={styles.cityText} numberOfLines={1}>
            <Icon name="location-sharp" size={13} color={DARK_GRAY} /> {localizacao}
        </Text>
    </TouchableOpacity>
);

export default City;
