"use client"

import { AddPlatform } from "@/app/action"
import { useState } from "react"
import { toast } from "sonner";
import { useForm } from '@conform-to/react';
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { UploadDropzone } from "@/lib/uploadthing"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { parseWithZod } from "@conform-to/zod";
import { platformSchema } from "@/app/lib/zodSchemas";
import { SubmitButton } from "@/components/global/SubmitButtons";
import { useFormState } from "react-dom";
import NetflixIcon from '../../../../public/netflix.png'
import YoutubeIcon from '../../../../public/youtube.png'
import SpotifyIcon from '../../../../public/spotify.png'
import AmazonPrimeIcon from '../../../../public/amazon-prime-video.png'

const predefinedIcons = [
    YoutubeIcon,
    NetflixIcon,
    SpotifyIcon,
    AmazonPrimeIcon,
];

const CreatePlatform = () => {
    const [lastResult, action] = useFormState(AddPlatform, undefined)
    const [image, setImage] = useState<undefined | string>(undefined);
    const [form, fields] = useForm({
        lastResult,

        onValidate({ formData }) {
            return parseWithZod(formData, {
                schema: platformSchema,
            })
        },

        shouldValidate: "onBlur",
        shouldRevalidate: "onInput"
    })

    const handleIconSelect = (icon: string) => {
        setImage(icon);
    }
    

    return (
        <div>
            <Sheet>
                <SheetTrigger className="bg-primary text-accent font-semibold p-2 rounded-md ">
                    Add Platform
                </SheetTrigger>
                <SheetContent className="w-full sm:max-w-full lg:max-w-[800px] max-h-[100vh] overflow-y-auto p-4">
                    <SheetHeader>
                        <SheetTitle>Add a new platform!</SheetTitle>
                    </SheetHeader>
                    <form id={form.id} onSubmit={() => {
                        form.onSubmit
                    }} action={action}>
                        <div className="grid gap-4 py-4">
                            <div className="grid items-center gap-4">
                                <Label htmlFor="name" className="text-left">
                                    Title
                                </Label>
                                <Input
                                    name={fields.name.name}
                                    key={fields.name.key}
                                    defaultValue={fields.name.initialValue}
                                    placeholder="Youtube"
                                />
                                <p className="text-red-500 text-sm">{fields.name.errors}</p>
                            </div>
                            <div className="grid items-center gap-4">
                                <Label htmlFor="description" className="text-left">
                                    Description
                                </Label>
                                <Textarea
                                    name={fields.description.name}
                                    key={fields.description.key}
                                    defaultValue={fields.description.initialValue}
                                    placeholder="All the youtube data will be stored here."
                                />
                                <p className="text-red-500 text-sm">{fields.description.errors}</p>
                            </div>
                            <div className="flex flex-col gap-y-2">
                                <Label>Project Logo/Icon</Label>
                                <input
                                    type="hidden"
                                    name={fields.logo.name}
                                    key={fields.logo.key}
                                    defaultValue={fields.logo.initialValue}
                                    value={image}
                                />
                                <div className="flex items-center gap-4">
                                    {predefinedIcons.map((icon) => (
                                        <div className={`cursor-pointer ${image === icon.src ? 'border-2 shadow-inner shadow-black p-2 rounded-md bg-muted' : ''}`} onClick={() => handleIconSelect(icon.src)}>
                                            <Image
                                                src={icon}
                                                alt="Predefined Icon"
                                                width={60}
                                                height={100}
                                                className="rounded"
                                            />
                                        </div>
                                    ))}
                                </div>
                                <UploadDropzone
                                    className="border-accent"
                                    endpoint="imageUploader"
                                    onClientUploadComplete={(res) => {
                                        const uploadedUrl = res[0].url;
                                        setImage(uploadedUrl);
                                        toast.success("Your images have been uploaded");
                                    }}
                                    onUploadError={(error: Error) => {
                                        toast.error("Something went wrong, try again");
                                    }}
                                />
                                <p className="text-red-500 text-sm">{fields.logo.errors}</p>
                                {image && (
                                    <div className="flex w-full justify-center">
                                        <Image
                                            src={image}
                                            alt="Uploaded Resource Logo"
                                            width={200}
                                            height={200}
                                            className="rounded"
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                        <SheetFooter>
                            <SheetClose asChild>
                                <SubmitButton text="Add Platform" />
                            </SheetClose>
                        </SheetFooter>
                    </form>
                </SheetContent>
            </Sheet>
        </div>
    )
}

export default CreatePlatform