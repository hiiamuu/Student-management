import { useForm } from "react-hook-form";
import FormField from "./FormField";

const MyForm = () => {
    // const form = useForm();
    const { register, handleSubmit, formState, reset, watch } = useForm({
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
        mode: "onBlur",
    });

    const password = watch("password");

    const onSubmit = (data) => {
        console.log(data);
        reset();

        // API CALL HERE
    };
    const inputClass = (hasError) =>
        `w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
            hasError ? "border-red-500 bg-red-50" : "border-gray-300 bg-white"
        }`;

    console.log(formState.errors.formState);

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="max-w-sm space-y-4 p-6"
        >
            <FormField label="Full name" error={formState.errors.name?.message}>
                <input
                    {...register("name", {
                        required: "Full name is required.",
                    })}
                    className={inputClass(formState.errors.name)}
                    placeholder="Enter your full name"
                />
            </FormField>
            <FormField label="Email" error={formState.errors.email?.message}>
                <input
                    {...register("email", {
                        required: "Email is required.",
                    })}
                    className={inputClass(formState.errors.eamil)}
                    placeholder="Enter your email"
                />
            </FormField>

            <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                    Password
                </label>
                <input
                    type="password"
                    {...register("password", {
                        required: "Password is required.",
                        minLength: {
                            value: 8,
                            message: "At least 8 characters.",
                        },
                    })}
                    className={inputClass(formState.errors.password)}
                    placeholder="Minimum 8 characters"
                />
                {formState.errors.password && (
                    <p className="mt-1 text-xs text-red-600">
                        {formState.errors.password.message}
                    </p>
                )}
            </div>
            <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                    Confirm password
                </label>
                <input
                    type="password"
                    {...register("confirmPassword", {
                        required: "Please confirm your password.",
                        validate: (value) =>
                            value === password || "Passwords do not match.",
                    })}
                    className={inputClass(formState.errors.confirmPassword)}
                    placeholder="Repeat your password"
                />
                {formState.errors.confirmPassword && (
                    <p className="mt-1 text-xs text-red-600">
                        {formState.errors.confirmPassword.message}
                    </p>
                )}
            </div>

            {/* <div>
                <input
                    {...register("name", {
                        required: "Name is required.",
                        minLength: {
                            value: 3,
                            message: "Username must be at least 3 characters.",
                        },
                        maxLength: {
                            value: 10,
                            message:
                                "Username must not be greate than 10 charcters.",
                        },
                        pattern: {
                            value: /^[A-Za-z\s]+$/,
                            message: "Inavaild string",
                        },
                        validate: (value) => {
                            value === getValues("password") ||
                                "Passwords do not match.";
                        },
                    })}
                    placeholder="Full name"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                {formState.errors.name && (
                    <p className="mt-1 text-xs text-red-600">
                        {formState.errors.name.message}
                    </p>
                )}
            </div> */}
            {/* 
            <div>
                <input
                    {...register("email", { required: "Email is required." })}
                    placeholder="Email address"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                {formState.errors.email && (
                    <p className="mt-1 text-xs text-red-600">
                        {formState.errors.email.message}
                    </p>
                )}
            </div>
            <div>
                <input
                    {...register("phone", {
                        required: "Phone is required.",
                        minLength: {
                            value: 10,
                            message: "Phone must be at least 10 characters.",
                        },
                        maxLength: {
                            value: 15,
                            message:
                                "Phone must not be greate than 15 charcters.",
                        },
                    })}
                    placeholder="Full name"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                {formState.errors.phone && (
                    <p className="mt-1 text-xs text-red-600">
                        {formState.errors.phone.message}
                    </p>
                )}
            </div>
            <div>
                <input
                    {...register("marks", {
                        required: "Marks is required.",
                        min: {
                            value: 0,
                            message: "Should be greate than 0!",
                        },
                        max: {
                            value: 100,
                            message: "Should be less than 100!",
                        },
                    })}
                    placeholder="Marks"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                {formState.errors.marks && (
                    <p className="mt-1 text-xs text-red-600">
                        {formState.errors.marks.message}
                    </p>
                )}
            </div> */}

            <button
                type="submit"
                className="w-full cursor-pointer rounded-lg bg-blue-600 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
            >
                Submit
            </button>
            <button
                type="submit"
                onClick={() => reset()}
                className="w-full cursor-pointer rounded-lg bg-blue-600 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
            >
                Resest
            </button>
        </form>
    );
};

export default MyForm;
