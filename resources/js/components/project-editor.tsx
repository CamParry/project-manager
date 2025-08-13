import { ErrorBoundary } from "@/components/error-boundary";
import { TaskItem, TaskList } from "@tiptap/extension-list";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import { Editor, useEditorState } from "@tiptap/react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
    AlignCenterIcon,
    AlignLeftIcon,
    AlignRightIcon,
    BoldIcon,
    Heading1Icon,
    Heading2Icon,
    Heading3Icon,
    ItalicIcon,
    ListChecksIcon,
    ListIcon,
    ListOrderedIcon,
    UnderlineIcon,
} from "lucide-react";

export function ProjectEditor({
    value,
    onChange,
}: {
    value: string;
    onChange: (value: string) => void;
}) {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            TextAlign.configure({
                types: ["heading", "paragraph"],
            }),
            Placeholder.configure({
                placeholder: "Start writing your project notes...",
            }),
            TaskList.configure({
                HTMLAttributes: {
                    class: "list-checklist",
                },
            }),
            TaskItem.configure({
                nested: true,
            }),
        ],
        content: value || "",
        editorProps: {
            attributes: {
                class: "grow mx-auto w-full max-w-3xl py-12 focus:outline-none bg-bg text-text",
            },
        },
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
    });

    return (
        <ErrorBoundary>
            <div className="flex h-[calc(100vh-4rem)] grow flex-col">
                <EditorToolbar editor={editor} />
                <EditorContent
                    editor={editor}
                    className="grow overflow-y-auto"
                />
            </div>
        </ErrorBoundary>
    );
}

type EditorToolbarProps = {
    editor: Editor | null;
};

export function EditorToolbar({ editor }: EditorToolbarProps) {
    const editorState = useEditorState({
        editor,
        selector: ({ editor }) => {
            if (!editor) return null;
            return {
                isH1Active: editor.isActive("heading", { level: 1 }),
                isH2Active: editor.isActive("heading", { level: 2 }),
                isH3Active: editor.isActive("heading", { level: 3 }),
                isParagraphActive: editor.isActive("paragraph"),
                isBoldActive: editor.isActive("bold"),
                isItalicActive: editor.isActive("italic"),
                isUnderlineActive: editor.isActive("underline"),
                isStrikeActive: editor.isActive("strike"),
                isCodeActive: editor.isActive("code"),
                isBlockquoteActive: editor.isActive("blockquote"),
                isTaskListActive: editor.isActive("taskList"),
                isOrderedListActive: editor.isActive("orderedList"),
                isBulletListActive: editor.isActive("bulletList"),
                isAlignLeftActive: editor.isActive({ textAlign: "left" }),
                isAlignCenterActive: editor.isActive({ textAlign: "center" }),
                isAlignRightActive: editor.isActive({ textAlign: "right" }),
            };
        },
    });

    if (!editor) {
        return null;
    }

    return (
        <div className="flex shrink-0 border-b border-border-muted px-6 py-2">
            <div className="mx-auto flex w-full max-w-3xl items-center gap-1">
                <div className="mr-3 flex items-center gap-1">
                    <ToolbarButton
                        onClick={() =>
                            editor
                                .chain()
                                .focus()
                                .toggleHeading({ level: 1 })
                                .run()
                        }
                        isActive={editorState?.isH1Active}
                        title="Heading 1"
                    >
                        <Heading1Icon className="size-4" />
                    </ToolbarButton>
                    <ToolbarButton
                        onClick={() =>
                            editor
                                .chain()
                                .focus()
                                .toggleHeading({ level: 2 })
                                .run()
                        }
                        isActive={editorState?.isH2Active}
                        title="Heading 2"
                    >
                        <Heading2Icon className="size-4" />
                    </ToolbarButton>
                    <ToolbarButton
                        onClick={() =>
                            editor
                                .chain()
                                .focus()
                                .toggleHeading({ level: 3 })
                                .run()
                        }
                        isActive={editorState?.isH3Active}
                        title="Heading 3"
                    >
                        <Heading3Icon className="size-4" />
                    </ToolbarButton>
                </div>

                {/* Divider */}
                <div className="mr-3 h-6 w-px bg-border-muted" />

                {/* Text Style Controls */}
                <div className="mr-3 flex items-center gap-1">
                    <ToolbarButton
                        onClick={() =>
                            editor.chain().focus().toggleBold().run()
                        }
                        isActive={editorState?.isBoldActive}
                        title="Bold"
                    >
                        <BoldIcon className="size-4" />
                    </ToolbarButton>
                    <ToolbarButton
                        onClick={() =>
                            editor.chain().focus().toggleItalic().run()
                        }
                        isActive={editorState?.isItalicActive}
                        title="Italic"
                    >
                        <ItalicIcon className="size-4" />
                    </ToolbarButton>
                    <ToolbarButton
                        onClick={() =>
                            editor.chain().focus().toggleUnderline().run()
                        }
                        isActive={editorState?.isUnderlineActive}
                        title="Underline"
                    >
                        <UnderlineIcon className="size-4" />
                    </ToolbarButton>
                </div>

                {/* Divider */}
                <div className="mr-3 h-6 w-px bg-border-muted" />

                {/* Alignment Controls */}
                <div className="mr-3 flex items-center gap-1">
                    <ToolbarButton
                        onClick={() =>
                            editor.chain().focus().setTextAlign("left").run()
                        }
                        isActive={editorState?.isAlignLeftActive}
                        title="Align Left"
                    >
                        <AlignLeftIcon className="size-4" />
                    </ToolbarButton>
                    <ToolbarButton
                        onClick={() =>
                            editor.chain().focus().setTextAlign("center").run()
                        }
                        isActive={editorState?.isAlignCenterActive}
                        title="Align Center"
                    >
                        <AlignCenterIcon className="size-4" />
                    </ToolbarButton>
                    <ToolbarButton
                        onClick={() =>
                            editor.chain().focus().setTextAlign("right").run()
                        }
                        isActive={editorState?.isAlignRightActive}
                        title="Align Right"
                    >
                        <AlignRightIcon className="size-4" />
                    </ToolbarButton>
                </div>

                {/* Divider */}
                <div className="mr-3 h-6 w-px bg-border-muted" />

                {/* List Controls */}
                <div className="flex items-center gap-1">
                    <ToolbarButton
                        onClick={() =>
                            editor.chain().focus().toggleBulletList().run()
                        }
                        isActive={editorState?.isBulletListActive}
                        title="Bullet List"
                    >
                        <ListIcon className="size-4" />
                    </ToolbarButton>
                    <ToolbarButton
                        onClick={() =>
                            editor.chain().focus().toggleOrderedList().run()
                        }
                        isActive={editorState?.isOrderedListActive}
                        title="Ordered List"
                    >
                        <ListOrderedIcon className="size-4" />
                    </ToolbarButton>
                    <ToolbarButton
                        onClick={() =>
                            editor.chain().focus().toggleTaskList().run()
                        }
                        isActive={editorState?.isTaskListActive}
                        title="Task List"
                    >
                        <ListChecksIcon className="size-4" />
                    </ToolbarButton>
                </div>
            </div>
        </div>
    );
}

const ToolbarButton = ({
    onClick,
    isActive = false,
    children,
    title,
}: {
    onClick: () => void;
    isActive?: boolean;
    children: React.ReactNode;
    title: string;
}) => (
    <button
        onClick={onClick}
        title={title}
        className={`icon-button size-8 ${isActive ? "border-border" : ""}`}
    >
        {children}
    </button>
);
