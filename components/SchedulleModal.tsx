import React, { useState } from "react";
import { Platform } from "react-native";
import { View } from "react-native";
import DateTimePicker, { Event } from "@react-native-community/datetimepicker";

type Props = {
  show: boolean;
  toggleShow: (show: boolean) => void;
};

type AndroidMode = "date" | "time";

const isApple = Platform.OS === "ios";

export default function SchedulleModal({ show, toggleShow }: Props) {
  const now = new Date();

  const isComercialTime = now.getHours() > 9 && now.getHours() < 20;

  const tomorrow = new Date();
  tomorrow.setDate(now.getDate() + 1);
  tomorrow.setHours(9, 0, 0);

  const verifiedDate = isComercialTime ? now : tomorrow;

  const [date, setDate] = useState(verifiedDate);
  const [mode, setMode] = useState<AndroidMode | undefined>("date");
  const [selectTime, toggleSelectTime] = useState(false);

  const onChange = (event: Event, selectedDate: Date | undefined) => {
    const currentDate = selectedDate || date;
    toggleShow(isApple);

    if (selectTime) {
      toggleSelectTime(false);

      return setDate(currentDate);
    }

    setDate(currentDate);
    toggleSelectTime(true);
    showTimepicker();
  };

  const showMode = (currentMode: AndroidMode | undefined) => {
    toggleShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

  return (
    <View>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
          minimumDate={verifiedDate}
          minuteInterval={30}
        />
      )}
    </View>
  );
}
