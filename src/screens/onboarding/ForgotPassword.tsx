import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Button, Col, Container, TextField } from "../../components";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import { formFieldProps, formikProps } from "../../utils/form";
import { forgotPasswordSchema } from "../../utils/validations";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Theme } from "../../types";
import { useStylesheet } from "../../hooks/useStylesheet";
import { OdinKeyboardAwareScrollView } from "../../components/ui/OdinKeyboardAwareScrollView.tsx";
import { FormContainer } from "../../components/ui/FormContainer.tsx";
import { useTheme } from "../../hooks/useTheme.ts";
import { forgotPassword } from "../../api/user.ts";
import { showToast } from "../../utils/toast.ts";
import { OnBoardingStackParamList } from "./OnBoardingNavigator.tsx";

type FormValues = {
  email: string;
};
type Props = NativeStackScreenProps<OnBoardingStackParamList, "ForgotPassword">;

export const ForgotPassword = ({ navigation }: Props) => {
  const { t } = useTranslation();
  const styles = useStylesheet(createStyles);
  const [loading, setLoading] = useState(false);
  const { colors } = useTheme();

  const { values, errors, setFieldError, setFieldValue, handleSubmit } =
    useFormik<FormValues>({
      initialValues: {
        email: "",
      },
      ...formikProps,
      validationSchema: forgotPasswordSchema,
      onSubmit: async (val) => {
        setLoading(true);
        try {
          await forgotPassword(val.email);
          navigation.pop();
          showToast(
            t("toasts.forgotPasswordSuccess"),
            t("toasts.forgotPasswordSuccessMessage"),
            {
              type: "success",
              visibilityTime: 5000,
            },
          );
        } catch (e) {
          setLoading(false);
          showToast(
            t("toasts.forgotPasswordError"),
            t("toasts.forgotPasswordErrorMessage"),
            {
              type: "error",
            }
          );
        }
      },
    });

  const fieldProps = formFieldProps(
    errors,
    values,
    setFieldError,
    setFieldValue
  );

  return (
    <Container>
      <OdinKeyboardAwareScrollView>
        <FormContainer>
          <TextField
            label={t("email")}
            autoCapitalize={"none"}
            type={"email"}
            {...fieldProps("email")}
          />
          <Button
            mt={12}
            variant={"gradient"}
            text={t("send email")}
            onPress={() => handleSubmit()}
            loading={loading}
          />
        </FormContainer>
      </OdinKeyboardAwareScrollView>
    </Container>
  );
};

const createStyles = ({ colors, spacing }: Theme) => StyleSheet.create({});
