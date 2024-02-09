import { ChangeEvent, useState } from 'react'
import logo from '../src/assets/logo-nlw-escuro.svg'
import { NewNoteCard } from './components/new-note-card'
import { NoteCard } from './components/note-card'

interface Note {
  id: string
  data: Date
  content: string
}

export function App() {

const [search, setSearch] = useState('')

  const [notes, setNotes] = useState<Note[]>(() => {
    const notesOnStorage = localStorage.getItem('notes')
    if (notesOnStorage){
      return JSON.parse(notesOnStorage)
    }
    return[]
  })

  function onNoteCreated(content:String){
    const newNote = {
      id: crypto.randomUUID(),
      data: new Date(),
      content,
    }

    const notesArray = [newNote, ...notes]
    setNotes(notesArray)
    
    localStorage.setItem('notes', JSON.stringify(notesArray))
  }

  function handleSearch(event: ChangeEvent<HTMLInputElement>){
    const query = event.target.value
    setSearch(query)
  }

  console.log(search)

  return(
    <div className="max-w-6xl mx-auto my-12 space-y-6">
      <img src={logo} alt="NLW" />
      
      <form className="w-full">
        <input
          type="text" 
          placeholder='Busque em suas notas...'
          className="w-full bg-transparent text-3xl font-semibold outline-none tracking-tight placeholder: text-slate-500"
          onChange={handleSearch}
        />

      </form>
      
      <div className="h-px bg-slate-700" />
        <div className="grid grid-cols-3  gap-6 auto-rows-[250px]">
          <NewNoteCard onNoteCreated={onNoteCreated} />

          {notes.map(note => {
            return <NoteCard key={note.id} note={note} />
          })}
        </div>
      </div>
  )
}


