import { useRef, useState } from 'react'
import { FaBold, FaItalic, FaUnderline, FaListUl, FaListOl, FaUpload, FaSave } from 'react-icons/fa'
import { createBlog } from '../utils/blogApi'

function RichField({ label, editorRef, minHeight = 'min-h-[72px]', textSize = 'text-base', placeholder }) {
  const btn = 'p-1.5 rounded hover:bg-[rgb(1,90,172)] transition text-white cursor-pointer select-none'
  const btnTxt = `${btn} text-xs font-bold px-2`

  const fmt = (cmd, val = null) => {
    document.execCommand(cmd, false, val)
    editorRef.current?.focus()
  }

  return (
    <div>
      <label className="text-xs text-gray-500 uppercase tracking-widest mb-2 block">{label}</label>
      <div className="border border-gray-700 rounded-xl overflow-hidden">
        {/* Toolbar */}
        <div className="flex items-center gap-1 px-2 py-1.5 bg-gray-900 border-b border-gray-700 flex-wrap">
          <button onClick={() => fmt('bold')} className={btn} title="Bold"><FaBold /></button>
          <button onClick={() => fmt('italic')} className={btn} title="Italic"><FaItalic /></button>
          <button onClick={() => fmt('underline')} className={btn} title="Underline"><FaUnderline /></button>
          <span className="w-px h-4 bg-gray-700 mx-1" />
          <button onClick={() => fmt('formatBlock', 'H1')} className={btnTxt} title="H1">H1</button>
          <button onClick={() => fmt('formatBlock', 'H2')} className={btnTxt} title="H2">H2</button>
          <button onClick={() => fmt('formatBlock', 'P')} className={btnTxt} title="Paragraph">P</button>
          <span className="w-px h-4 bg-gray-700 mx-1" />
          <button onClick={() => fmt('insertUnorderedList')} className={btn} title="Bullet list"><FaListUl /></button>
          <button onClick={() => fmt('insertOrderedList')} className={btn} title="Numbered list"><FaListOl /></button>
        </div>
        {/* Editor */}
        <div
          ref={editorRef}
          contentEditable
          suppressContentEditableWarning
          className={`blog-editor ${minHeight} p-4 text-gray-200 outline-none ${textSize} leading-relaxed`}
          style={{ fontFamily: 'var(--font-google)', caretColor: 'rgb(1,90,172)' }}
          data-placeholder={placeholder}
        />
      </div>
    </div>
  )
}

export default function EnterBlog() {
  const contentRef = useRef(null)
  const synopsisRef = useRef(null)
  const [title, setTitle] = useState('')
  const [coverImage, setCoverImage] = useState(null)
  const [coverFile, setCoverFile] = useState(null)
  const [status, setStatus] = useState('')

  const handleCoverImage = (e) => {
    const file = e.target.files[0]
    if (!file) return
    setCoverFile(file)
    const reader = new FileReader()
    reader.onload = (ev) => setCoverImage(ev.target.result)
    reader.readAsDataURL(file)
  }

  const handleSave = async (publish = false) => {
    const content = contentRef.current?.innerHTML || ''
    const synopsis = synopsisRef.current?.innerHTML || ''
    if (!title.trim() || !content.trim() || !synopsis.trim()) {
      setStatus('Please fill in all three fields.')
      return
    }
    try {
      setStatus('Saving...')
      await createBlog({
        title,
        content,
        synopsis,
        coverDataUrl: coverImage,
        coverFilename: coverFile?.name,
      })
      setStatus(publish ? 'Published successfully!' : 'Draft saved!')
    } catch (err) {
      setStatus(err.message || 'Error saving post.')
    }
  }

  return (
    <div className="min-h-screen bg-black text-white px-4 py-12">
      <div className="max-w-3xl mx-auto flex flex-col gap-10">

        <div>
          <p className="text-xs tracking-widest text-gray-500 uppercase mb-1">New Entry</p>
          <h1 className="text-4xl font-bold" style={{ fontFamily: 'var(--font-google)' }}>Enter Blog</h1>
        </div>

        {/* Cover image */}
        <div>
          <label className="text-xs text-gray-500 uppercase tracking-widest mb-2 block">Cover Image</label>
          <div
            onClick={() => document.getElementById('coverInput').click()}
            className="w-full h-52 border border-dashed border-gray-700 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-[rgb(1,90,172)] transition overflow-hidden"
          >
            {coverImage ? (
              <img src={coverImage} alt="cover" className="w-full h-full object-cover" />
            ) : (
              <div className="flex flex-col items-center gap-2 text-gray-600">
                <FaUpload className="text-2xl" />
                <span className="text-sm">Click to upload cover image</span>
              </div>
            )}
          </div>
          {coverFile && <p className="mt-2 text-xs text-gray-600">{coverFile.name}</p>}
          <input id="coverInput" type="file" accept="image/*" onChange={handleCoverImage} className="hidden" />
        </div>

        {/* Title */}
        <div>
          <label className="text-xs text-gray-500 uppercase tracking-widest mb-2 block">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder='e.g. "Post 01 — Machine Memory"'
            className="w-full bg-transparent border-b border-gray-700 text-white text-2xl placeholder-gray-600 pb-3 outline-none focus:border-[rgb(1,90,172)] transition"
            style={{ fontFamily: 'var(--font-google)' }}
          />
        </div>

        {/* Content */}
        <RichField
          label="Content — short tagline"
          editorRef={contentRef}
          minHeight="min-h-[80px]"
          textSize="text-lg"
          placeholder='e.g. "A short reflection on how machines remember and what they forget."'
        />

        {/* Synopsis */}
        <RichField
          label="Synopsis — body note"
          editorRef={synopsisRef}
          minHeight="min-h-[100px]"
          textSize="text-base"
          placeholder='e.g. "Notes on storage, retrieval, and the politics of keeping data alive in the background."'
        />

        {/* Status */}
        {status && (
          <p className={`text-sm -mt-6 ${status.includes('Error') || status.includes('fill') ? 'text-red-400' : 'text-green-400'}`}>
            {status}
          </p>
        )}

        {/* Actions */}
        <div className="flex gap-4">
          <button
            onClick={() => handleSave(false)}
            className="flex items-center gap-2 px-6 py-3 border border-gray-700 rounded-lg text-gray-400 hover:border-white hover:text-white transition text-sm"
          >
            <FaSave /> Save Draft
          </button>
          <button
            onClick={() => handleSave(true)}
            className="flex items-center gap-2 px-6 py-3 bg-[rgb(1,90,172)] rounded-lg text-white hover:brightness-110 transition text-sm font-semibold"
          >
            Publish Post
          </button>
        </div>

      </div>
    </div>
  )
}
