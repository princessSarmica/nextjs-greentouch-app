import type { Metadata } from "next";
import { SignUpForm } from "./sign-up-form";
import { useTranslations } from "next-intl";

export const metadata: Metadata = {
  title: "Sign up",
};

export default function SignUpPage() {

    //console.log("Sign up Page rendered");

    const t = useTranslations("signUpPage");

    return (
        <main className="min-h-screen bg-[#f5f5f5]">
            <section className="mx-auto max-w-5xl px-4 md:px-8 py-10 md:py-14">

                {/* Header */}
                <div className="mb-8 md:mb-10">
                    <h1 className="text-3xl md:text-4xl font-semibold mb-4 text-left">
                        {t("title")}
                    </h1>
                    <div className="mt-2 h-px w-full bg-[#0A3730]/70" />
                    <div className="mt-2 text-sm text-[#2E7D5A]">
                        {t("labelRequired")}
                    </div>

                </div>
                    <SignUpForm 
                        signUpFormTranslations={{
                            labelName: t("signUpForm.labelName"),
                            labelSurname: t("signUpForm.labelSurname"),
                            labelPosition: t("signUpForm.labelPosition"),
                            labelStudent: t("signUpForm.labelStudent"),
                            labelAcademicStaff: t("signUpForm.labelAcademicStaff"),
                            labelOther: t("signUpForm.labelOther"),
                            labelUniversityTitle: t("signUpForm.labelUniversityTitle"),
                            labelUniversity: t("signUpForm.labelUniversity"),
                            labelFieldOfWork: t("signUpForm.labelFieldOfWork"),
                            labelSpecialization: t("signUpForm.labelSpecialization"),
                            labelMotivation: t("signUpForm.labelMotivation"),
                            labelPersonalInterest: t("signUpForm.labelPersonalInterest"),
                            labelProfessionalInterest: t("signUpForm.labelProfessionalInterest"),
                            labelBothOfThem: t("signUpForm.labelBothOfThem"),
                            labelEmail: t("signUpForm.labelEmail"),
                            labelUsername: t("signUpForm.labelUsername"),
                            labelPassword: t("signUpForm.labelPassword"),
                            labelConfirmPassword: t("signUpForm.labelConfirmPassword"),
                            buttonSignUp: t("signUpForm.buttonSignUp"),
                            haveAccountText: t("signUpForm.haveAccountText"),
                            signInLink: t("signUpForm.signInLink"),
                            formMessages: {
                                firstNameRequired: t("signUpForm.formMessages.firstNameRequired"),
                                lastNameRequired: t("signUpForm.formMessages.lastNameRequired"),
                                validEmailRequired: t("signUpForm.formMessages.validEmailRequired"),
                                confirmPasswordRequired: t("signUpForm.formMessages.confirmPasswordRequired"),
                                usernameTooShort: t("signUpForm.formMessages.usernameTooShort"),
                                usernameTooLong: t("signUpForm.formMessages.usernameTooLong"),
                                usernameInvalidCharacters: t("signUpForm.formMessages.usernameInvalidCharacters"),
                                selectPositionRequired: t("signUpForm.formMessages.selectPositionRequired"),
                                selectMotivationRequired: t("signUpForm.formMessages.selectMotivationRequired"),
                                selectUniversityRequired: t("signUpForm.formMessages.selectUniversityRequired"),
                                selectSpecializationRequired: t("signUpForm.formMessages.selectSpecializationRequired"),
                                passwordsDoNotMatch: t("signUpForm.formMessages.passwordsDoNotMatch"),
                                unknownError: t("signUpForm.formMessages.unknownError")
                            }
                        }}
                    />
            </section>
        </main>
    );
}