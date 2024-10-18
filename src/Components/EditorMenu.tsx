"use client";
import { type ReactNode, useEffect } from "react";
import { removeAIHighlight } from "novel/extensions";
import { EditorBubble, useEditor } from "novel";

interface EditorMenuProps {
    children: ReactNode;
    open: boolean;
    onOpenChange: (open: boolean) => void;
};

const EditorMenu = ({
    children,
    open,
    onOpenChange
}: EditorMenuProps) => {

    const { editor } = useEditor();

    useEffect(() => {

        if (!editor) return;

        if (!open) removeAIHighlight(editor);

    }, [open]);

    return (
        <EditorBubble
            className="flex w-fit max-w-[90vw] overflow-hidden rounded-md border border-muted bg-background shadow-xl"
            tippyOptions={{
                placement: open ? "bottom-start" : "top",
                onHidden: () => {
                    onOpenChange(false)
                    editor?.chain().unsetHighlight().run()
                }
            }}
        >
            {!open && children}
        </EditorBubble>
    )
};

export default EditorMenu;