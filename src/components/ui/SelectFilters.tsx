import React, { useState } from "react";
import {useStylesheet} from "../../hooks/useStylesheet.ts";
import {useTheme} from "../../hooks/useTheme.ts";
import {Col} from "./Col.tsx";
import {Row} from "./Row.tsx";
import {WIDTH_DEVICE} from "../../constant";
import {TextField} from "./TextField.tsx";
import {t} from "i18next";
import {IconButton} from "./IconButton.tsx";
import {Theme} from "../../types";
import { StyleSheet } from "react-native/types/index";

type SelectFiltersProps = {
  search: string;
  setSearch: (search: string) => void;
};

export const SelectFilters = ({
                                 search,
                                 setSearch,
                               }: SelectFiltersProps) => {
  const styles = useStylesheet(createStyles);
  const { spacing } = useTheme();
  const [showMoreFilters, setShowMoreFilters] = useState(false);

  return (
    <Col style={{ gap: 12 }}>
      <Row justifyContent={"space-between"}>
        <Col
          style={{
            width: WIDTH_DEVICE - spacing.screenHorizontal * 2 - 56 - 12,
          }}
        >
          <TextField
            placeholder={t("search")}
            style={{
              height: 56,
              backgroundColor: "transparent",
            }}
            value={search}
            autoCapitalize={"none"}
            onChangeText={setSearch}
          />
        </Col>
        <Col>
          <IconButton
            icon={["fas", "sliders"]}
            onPress={() => {
              setShowMoreFilters(!showMoreFilters);
            }}
          />
        </Col>
      </Row>
    </Col>
  );
};

const createStyles = ({ colors, spacing }: Theme) => StyleSheet.create({});
