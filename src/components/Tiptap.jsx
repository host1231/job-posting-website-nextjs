'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Toggle } from './ui/toggle'
import { Bold, Heading2, Italic, List, ListOrdered, Strikethrough } from 'lucide-react'

const Tiptap = ({ value, onChange }) => {
  const editor = useEditor({
    extensions: [StarterKit.configure()],
    // content: value,
    editorProps: {
      attributes: {
        class:
           "rounded-b-md border min-h-[150px] p-2 focus-within:border-primary focus:outline-none"
      }
    },
    onUpdate({ editor }) {
      onChange(editor.getHTML());
      console.log(editor.getHTML());
    }
  })

  if (!editor) {
    return null
  }

  return (
    <div className="flex flex-col justify-stretch h-full overflow-y-auto">
      {/* Панель управления */}
      <div className="toolbar border p-3 rounded-t-md">
        {/* <Toggle
          size="sm"
          pressed={editor.isActive("heading")}
          onPressedChange={() => editor.chain().focus().toggleHeading({level: 2}).run()}
        >
          <Heading2 className="h-4 w-4" />
        </Toggle> */}
        <Toggle
          size="sm"
          pressed={editor.isActive("bold")}
          onPressedChange={() => editor.chain().focus().toggleBold().run()}
        >
          <Bold className="h-4 w-4" />
        </Toggle>
        <Toggle
          size="sm"
          pressed={editor.isActive("italic")}
          onPressedChange={() => editor.chain().focus().toggleItalic().run()}
        >
          <Italic className="h-4 w-4" />
        </Toggle>
        <Toggle
          size="sm"
          pressed={editor.isActive("strike")}
          onPressedChange={() => editor.chain().focus().toggleStrike().run()}
        >
          <Strikethrough className="h-4 w-4" />
        </Toggle>
        <Toggle
          size="sm"
          pressed={editor.isActive("bulletList")}
          onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
        >
          <List className="h-4 w-4" />
        </Toggle>
        <Toggle
          size="sm"
          pressed={editor.isActive("orderedList")}
          onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
        >
          <ListOrdered className="h-4 w-4" />
        </Toggle>
      </div>

      {/* Редактор */}
      <EditorContent editor={editor} />
    </div>
  )
}

export default Tiptap
