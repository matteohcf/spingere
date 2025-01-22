import {Theme, User} from "../../../types";
import {Col, Icon, Text} from "../../../components";
import Image from "react-native-fast-image";
import {useStylesheet} from "../../../hooks/useStylesheet.ts";
import {StyleSheet} from "react-native";
import {colors, WIDTH_DEVICE} from "../../../constant";
import React from "react";
import {getOdinImage} from "../../../utils/images.ts";
import {getInitials} from "../../../utils/user.ts";
import {useProfileImageColor} from "../../../hooks/useProfileImageColor.ts";

type Props = {
  user: User;
}

export const UserDetailImage = ({ user }: Props) => {
  const styles = useStylesheet(createStyles);
  const image = getOdinImage({ image: user?.profileImage });
  const initial = getInitials(user);
  const color = useProfileImageColor(user);

  return (
    <Col>
      {image && <Image source={image} style={styles.profileImage} />}
      {!image && (
        <Col
          bgColor={color}
          style={styles.profileImage}
          justifyContent={"center"}
          alignItems={"center"}
        >
          {initial && (
            <Text color={colors.white} fontSize={28} fontWeight={"600"}>
              {initial}
            </Text>
          )}
          {!initial && (
            <Icon icon={["far", "user"]} color={colors.white} size={28} />
          )}
        </Col>
      )}
    </Col>
  )
}

const createStyles = ({ shapes, spacing }: Theme) =>
  StyleSheet.create({
    profileImage: {
      width: WIDTH_DEVICE / 4,
      height: WIDTH_DEVICE / 4,
      borderRadius: (WIDTH_DEVICE / 4) / 2,
    },
  });
