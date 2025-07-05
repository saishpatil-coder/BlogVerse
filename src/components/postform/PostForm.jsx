import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Input, RTE, Select } from "../index";
import service from "../../appwrite/config";


export default function PostForm({ post }) {

    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const userData = useSelector((state) => state.auth.userData);

    const submit = async (data) => {
        try {

            setIsSubmitting(true);
            if (post) {
                console.log("Updating Post : ", post)
                const file = data.image[0] ? await service.uploadFile(data.image[0]) : null;

                if (file) {
                    service.deleteFile(post.featuredImage);
                }

                const dbPost = await service.updatePost(post.$id, {
                    ...data,
                    userName: userData.name,
                    featuredImage: file ? file.$id : undefined,
                });

                navigate("/", { state: { message: "Post updated successfully!" } });

                console.log("Updated Post : ", dbPost)
            } else {
                let file ;
                if (data.image[0]) {
                    file = await service.uploadFile(data.image[0]);
                }
                else {
                    file = null;
                }

        
                    const fileId = file?.$id || null;
                    data.featuredImage = fileId;
                    const dbPost = await service.createPost({ ...data, userId: userData.$id, userName: userData.name });
                    console.log(data)
                    if (dbPost) {
                        navigate("/", { state: { message: "Post created successfully!" } });
                    }
 
            }
            setIsSubmitting(false);
        } catch (error) {
            setIsSubmitting(false);
            console.log("Error : ", error)
        }
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, []);

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: false })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={service.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button
                    type="submit"
                    bgColor={post ? "bg-green-500" : undefined}
                    className="w-full"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? "Uploading..." : post ? "Update" : "Submit"}
                </Button>

            </div>
        </form>
    );
}
