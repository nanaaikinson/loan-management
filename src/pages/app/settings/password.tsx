import Button from "@/components/common/Button";
import ErrorMessage from "@/components/common/ErrorMessage";
import PasswordInput from "@/components/form/PasswordInput";
import { AuthService } from "@/services/auth.service";
import { useAuthStore } from "@/stores/auth";
import {
  ChangePasswordForm,
  changePasswordValidationSchema,
} from "@/validation/settings";
import { yupResolver } from "@hookform/resolvers/yup";
import { isAxiosError } from "axios";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useTitle } from "react-use";

const ChangePassword = () => {
  useTitle("Change Password | Microlend");

  // State
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();
  const {
    handleSubmit,
    setError,
    setValue,
    formState: { errors },
  } = useForm<ChangePasswordForm>({
    resolver: yupResolver(changePasswordValidationSchema),
  });

  // Methods
  const onSubmit = async (data: ChangePasswordForm) => {
    setIsSubmitting(true);

    try {
      await AuthService.instance().changePassword(data);

      toast.success("Password changed successfully. Please login again.");
      logout();
      navigate("/");
    } catch (error) {
      if (isAxiosError(error) && error?.response) {
        const { status, data } = error.response;

        if (status === 422) {
          for (const [k, value] of Object.entries(data.errors)) {
            const key = k as keyof ChangePasswordForm;
            const val = value as string[];

            if (key in data.errors) {
              setError(key, {
                type: "manual",
                message: val[0],
              });
            } else {
              setError("currentPassword", {
                type: "manual",
                message: data.message,
              });
            }
          }
        } else {
          setError("currentPassword", {
            type: "manual",
            message: data.message,
          });
        }
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Template
  return (
    <>
      <div className="flex flex-col w-full max-w-sm mx-auto">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="currentPassword">Current Password*</label>
            <PasswordInput
              id="currentPassword"
              name="currentPassword"
              onChange={(e) => {
                setValue("currentPassword", e.target.value, {
                  shouldValidate: true,
                });
                setCurrentPassword(e.target.value);
              }}
              onBlur={(e) => {
                setValue("currentPassword", e.target.value, {
                  shouldValidate: true,
                });
                setCurrentPassword(e.target.value);
              }}
              value={currentPassword}
            />
            {errors?.currentPassword?.message && (
              <ErrorMessage message={errors?.currentPassword?.message} />
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="newPassword">New Password*</label>
            <PasswordInput
              id="newPassword"
              name="newPassword"
              autoComplete="new-password"
              onChange={(e) => {
                setValue("newPassword", e.target.value, {
                  shouldValidate: true,
                });
                setNewPassword(e.target.value);
              }}
              onBlur={(e) => {
                setValue("newPassword", e.target.value, {
                  shouldValidate: true,
                });
                setNewPassword(e.target.value);
              }}
              value={newPassword}
            />
            {errors?.newPassword?.message && (
              <ErrorMessage message={errors?.newPassword?.message} />
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="confirmNewPassword">Confirm New Password*</label>
            <PasswordInput
              id="confirmNewPassword"
              name="confirmNewPassword"
              onChange={(e) => {
                setValue("confirmNewPassword", e.target.value, {
                  shouldValidate: true,
                });
                setConfirmNewPassword(e.target.value);
              }}
              onBlur={(e) => {
                setValue("confirmNewPassword", e.target.value, {
                  shouldValidate: true,
                });
                setConfirmNewPassword(e.target.value);
              }}
              value={confirmNewPassword}
            />
            {errors?.confirmNewPassword?.message && (
              <ErrorMessage message={errors?.confirmNewPassword?.message} />
            )}
          </div>

          <div className="pt-4">
            <Button block type="submit" disabled={isSubmitting}>
              Change Password
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ChangePassword;
