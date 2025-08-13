import { Button } from "@/components/button";
import { Checkbox } from "@/components/checkbox";
import { Error } from "@/components/error";
import { Field } from "@/components/field";
import { Input } from "@/components/input";
import { Label } from "@/components/label";
import { GuestLayout } from "@/components/layout-guest";
import { Head, Link, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";

export default function Login({
    status,
    canResetPassword,
}: {
    status?: string;
    canResetPassword: boolean;
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false as boolean,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("login"), {
            onFinish: () => reset("password"),
        });
    };

    return (
        <GuestLayout>
            <Head title="Log in" />
            <div className="rounded-xl border border-border bg-bg p-8">
                <h1 className="mb-6 text-3xl font-bold">Projecto</h1>
                {status && (
                    <div className="mb-4 text-sm font-medium">{status}</div>
                )}
                <form onSubmit={submit} className="space-y-4">
                    <Field>
                        <Label htmlFor="email" value="Email" />
                        <Input
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="mt-1 block w-full"
                            autoComplete="username"
                            autoFocus
                            onChange={(e) => setData("email", e.target.value)}
                        />
                        <Error message={errors.email} className="mt-2" />
                    </Field>
                    <Field>
                        <Label htmlFor="password" value="Password" />
                        <Input
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="mt-1 block w-full"
                            autoComplete="current-password"
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                        />
                        <Error message={errors.password} className="mt-2" />
                    </Field>
                    <div>
                        <label className="flex items-center gap-2">
                            <Checkbox
                                name="remember"
                                checked={data.remember}
                                onChange={(e) =>
                                    setData(
                                        "remember",
                                        (e.target.checked || false) as false
                                    )
                                }
                            />
                            <span className="text-sm text-text-muted">
                                Remember me
                            </span>
                        </label>
                    </div>
                    <Button
                        className="mt-2 w-full"
                        disabled={processing}
                        variant="primary"
                    >
                        Login
                    </Button>
                    {canResetPassword && (
                        <Link
                            href={route("password.request")}
                            className="rounded-md text-sm text-sky-600 underline hover:text-sky-700 focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:outline-none dark:text-sky-400 dark:hover:text-sky-300"
                        >
                            Forgot your password?
                        </Link>
                    )}
                </form>
            </div>
        </GuestLayout>
    );
}
