import { Button } from "@/components/button";
import { Error } from "@/components/error";
import { Field } from "@/components/field";
import { Input } from "@/components/input";
import { Label } from "@/components/label";
import { Layout } from "@/components/layout";
import { useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";

export default function Edit() {
    const { data, setData, errors, put, reset, processing } = useForm({
        current_password: "",
        password: "",
        password_confirmation: "",
    });

    const updatePassword: FormEventHandler = (e) => {
        e.preventDefault();

        put(route("password.update"), {
            preserveScroll: true,
            onSuccess: () => reset(),
        });
    };

    return (
        <Layout title="Profile">
            <div className="py-12">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <section>
                        <header>
                            <h2 className="text-lg font-medium">
                                Update Password
                            </h2>
                            <p className="mt-1 text-sm text-text-muted">
                                Ensure your account is using a long, random
                                password to stay secure.
                            </p>
                        </header>
                        <form
                            onSubmit={updatePassword}
                            className="mt-6 space-y-6"
                        >
                            <Field>
                                <Label
                                    htmlFor="current_password"
                                    value="Current Password"
                                />
                                <Input
                                    id="current_password"
                                    value={data.current_password}
                                    onChange={(e) =>
                                        setData(
                                            "current_password",
                                            e.target.value
                                        )
                                    }
                                    type="password"
                                    autoComplete="current-password"
                                />
                                <Error>{errors.current_password}</Error>
                            </Field>
                            <Field>
                                <Label
                                    htmlFor="password"
                                    value="New Password"
                                />
                                <Input
                                    id="password"
                                    value={data.password}
                                    onChange={(e) =>
                                        setData("password", e.target.value)
                                    }
                                    type="password"
                                    autoComplete="new-password"
                                />
                                <Error>{errors.password}</Error>
                            </Field>

                            <Field>
                                <Label
                                    htmlFor="password_confirmation"
                                    value="Confirm Password"
                                />
                                <Input
                                    id="password_confirmation"
                                    value={data.password_confirmation}
                                    onChange={(e) =>
                                        setData(
                                            "password_confirmation",
                                            e.target.value
                                        )
                                    }
                                    type="password"
                                    autoComplete="new-password"
                                />
                                <Error>{errors.password_confirmation} </Error>
                            </Field>
                            <Button color="primary" disabled={processing}>
                                Save
                            </Button>
                        </form>
                    </section>
                </div>
            </div>
        </Layout>
    );
}
