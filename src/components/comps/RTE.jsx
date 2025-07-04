import { Editor } from '@tinymce/tinymce-react';
import { Controller } from 'react-hook-form';
import { useState } from 'react';


export default function RTE({ name, control, label, defaultValue = "" })
{
    const [charCount, setCharCount] = useState(0);
    const maxChars = 500;

    const handleEditorChange = (content, onChange) => {
        // Remove HTML tags and count characters
        const textContent = content.replace(/<[^>]*>/g, '').trim();
        const currentCharCount = textContent.length;
        
        setCharCount(currentCharCount);
        
        // Only allow changes if within character limit
        if (currentCharCount <= maxChars) {
            onChange(content);
        }
    };

    return (
        <div className='w-full'>
            {label && <label className='inline-block mb-1 pl-1'>{label}</label>}

            <Controller
                name={name || "content"}
                control={control}
                render={({ field: { onChange } }) => (
                    <>
                        <Editor
                        apiKey='eimrlw4w4y4wejm7z9qn6xr8k68uh1cwz7ub9woe1e1w3u94'
                            initialValue={defaultValue}
                            init={{
                                initialValue: defaultValue,
                                height: 500,
                                menubar: true,
                                plugins: [
                                    "image",
                                    "advlist",
                                    "autolink",
                                    "lists",
                                    "link",
                                    "image",
                                    "charmap",
                                    "preview",
                                    "anchor",
                                    "searchreplace",
                                    "visualblocks",
                                    "code",
                                    "fullscreen",
                                    "insertdatetime",
                                    "media",
                                    "table",
                                    "code",
                                    "help",
                                    "wordcount",
                                    "anchor",
                                ],
                                toolbar:
                                    "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
                                content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
                            }}
                            onEditorChange={(content) => handleEditorChange(content, onChange)}
                        />
                        <div className={`mt-2 text-sm ${charCount > maxChars ? 'text-red-500' : 'text-gray-600'}`}>
                            Character count: {charCount}/{maxChars}
                            {charCount > maxChars && (
                                <span className="ml-2 font-semibold">
                                    (Character limit exceeded!)
                                </span>
                            )}
                        </div>
                    </>
                )}
            />

        </div>
    )
}

