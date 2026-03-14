'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Quote,
  Redo2,
  Undo2,
} from 'lucide-react'
import { useEffect } from 'react'
import { cn } from '@/lib/utils'

interface CampaignDetailsEditorProps {
  value: string
  onChange: (value: string) => void
  className?: string
}

const toolbarButtonClassName =
  'inline-flex h-9 w-9 items-center justify-center rounded-[10px] border border-[#E7EBF0] bg-white text-[#667085] transition-colors hover:border-[#D6BEFF] hover:bg-[#F7F1FF] hover:text-[#8C5CFF]'

export default function CampaignDetailsEditor({
  value,
  onChange,
  className,
}: CampaignDetailsEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          HTMLAttributes: {
            class: 'list-disc pl-5',
          },
        },
        orderedList: {
          HTMLAttributes: {
            class: 'list-decimal pl-5',
          },
        },
        blockquote: {
          HTMLAttributes: {
            class:
              'border-l-4 border-[#D6BEFF] pl-4 italic text-[#5E6470]',
          },
        },
      }),
    ],
    content: value,
    editorProps: {
      attributes: {
        class:
          'min-h-[220px] rounded-b-[10px] bg-[#FBFBFB] px-4 py-4 text-sm text-[#2D2D2D] outline-none prose prose-sm max-w-none prose-p:my-2 prose-headings:my-3 prose-ul:my-2 prose-ol:my-2',
        spellcheck: 'false',
      },
    },
    onUpdate: ({ editor: currentEditor }) => {
      onChange(currentEditor.getHTML())
    },
    immediatelyRender: false,
  })

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value || '', { emitUpdate: false })
    }
  }, [editor, value])

  if (!editor) {
    return null
  }

  return (
    <div
      className={cn(
        'overflow-hidden rounded-[10px] border border-[#EEF1F5] bg-[#FBFBFB]',
        className,
      )}
    >
      <div className="flex flex-wrap items-center gap-2 border-b border-[#E8EDF3] bg-white px-3 py-3">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={cn(
            toolbarButtonClassName,
            editor.isActive('bold') && 'border-[#8C5CFF] bg-[#F3EAFF] text-[#8C5CFF]',
          )}
          aria-label="Bold"
        >
          <Bold className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={cn(
            toolbarButtonClassName,
            editor.isActive('italic') &&
              'border-[#8C5CFF] bg-[#F3EAFF] text-[#8C5CFF]',
          )}
          aria-label="Italic"
        >
          <Italic className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={cn(
            toolbarButtonClassName,
            editor.isActive('bulletList') &&
              'border-[#8C5CFF] bg-[#F3EAFF] text-[#8C5CFF]',
          )}
          aria-label="Bullet list"
        >
          <List className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={cn(
            toolbarButtonClassName,
            editor.isActive('orderedList') &&
              'border-[#8C5CFF] bg-[#F3EAFF] text-[#8C5CFF]',
          )}
          aria-label="Ordered list"
        >
          <ListOrdered className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={cn(
            toolbarButtonClassName,
            editor.isActive('blockquote') &&
              'border-[#8C5CFF] bg-[#F3EAFF] text-[#8C5CFF]',
          )}
          aria-label="Quote"
        >
          <Quote className="h-4 w-4" />
        </button>
        <div className="ml-auto flex items-center gap-2">
          <button
            type="button"
            onClick={() => editor.chain().focus().undo().run()}
            className={toolbarButtonClassName}
            aria-label="Undo"
          >
            <Undo2 className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().redo().run()}
            className={toolbarButtonClassName}
            aria-label="Redo"
          >
            <Redo2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      <EditorContent editor={editor} />
    </div>
  )
}
