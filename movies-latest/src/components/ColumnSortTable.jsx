import { useEffect, useState } from "react"
import { DndContext, closestCenter } from "@dnd-kit/core"
import {
  SortableContext,
  arrayMove,
  horizontalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"

const defaultColumns = [
  { key: "title", label: "Title" },
  { key: "rating", label: "Rating" },
  { key: "releaseDate", label: "Release Date" },
  { key: "genre", label: "Genre" },
  { key: "year", label: "Year" },
]

const extraColumns = [
  { key: "director", label: "Director" },
  { key: "language", label: "Language" },
  { key: "duration", label: "Duration" },
  { key: "country", label: "Country" },
  { key: "status", label: "Status" },
]

function DraggableHeader({ column }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: column.key })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <th ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {column.label}
    </th>
  )
}

function ColumnSortTable({ movies }) {
  const [showTable, setShowTable] = useState(false)

  const [columns, setColumns] = useState(() => {
    const saved = localStorage.getItem("columnsOrder")
    return saved ? JSON.parse(saved) : defaultColumns
  })

  const [extraChecked, setExtraChecked] = useState(() => {
    return localStorage.getItem("extraColumnsChecked") === "true"
  })

  const [tempChecked, setTempChecked] = useState(extraChecked)

  useEffect(() => {
    localStorage.setItem("columnsOrder", JSON.stringify(columns))
  }, [columns])

  function handleSaveColumns() {
    let updatedColumns = [...columns]

    if (tempChecked) {
      extraColumns.forEach((extra) => {
        const exists = updatedColumns.some((col) => col.key === extra.key)

        if (!exists) {
          updatedColumns.push(extra)
        }
      })
    } else {
      updatedColumns = updatedColumns.filter(
        (col) => !extraColumns.some((extra) => extra.key === col.key)
      )
    }

    setExtraChecked(tempChecked)
    setColumns(updatedColumns)

    localStorage.setItem("columnsOrder", JSON.stringify(updatedColumns))
    localStorage.setItem("extraColumnsChecked", tempChecked)
  }

  function handleDragEnd(event) {
    const { active, over } = event

    if (!over || active.id === over.id) return

    const oldIndex = columns.findIndex((col) => col.key === active.id)
    const newIndex = columns.findIndex((col) => col.key === over.id)

    const updatedColumns = arrayMove(columns, oldIndex, newIndex)

    setColumns(updatedColumns)
    localStorage.setItem("columnsOrder", JSON.sstringify(updatedColumns))
  }

  return (
    <div className="column-sort-wrapper">
      <button className="column-sort-btn" onClick={() => setShowTable(true)}>
        Column Sort
      </button>

      {showTable && (
        <div className="table-box">
          <div className="table-top">
            <label className="extra-label">
              <input
                type="checkbox"
                checked={tempChecked}
                onChange={(e) => setTempChecked(e.target.checked)}
              />
              Add extra 5 columns
            </label>

            <div className="table-actions">
              <button className="table-save-btn" onClick={handleSaveColumns}>
                Save
              </button>

              <button
                className="table-close-btn"
                onClick={() => setShowTable(false)}
              >
                Close
              </button>
            </div>
          </div>

          <DndContext
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <div className="table-scroll">
              <table className="movie-table">
                <thead>
                  <SortableContext
                    items={columns.map((col) => col.key)}
                    strategy={horizontalListSortingStrategy}
                  >
                    <tr>
                      {columns.map((col) => (
                        <DraggableHeader key={col.key} column={col} />
                      ))}
                    </tr>
                  </SortableContext>
                </thead>

                <tbody>
                  {movies.map((movie) => (
                    <tr key={movie.id}>
                      {columns.map((col) => (
                        <td key={col.key}>{movie[col.key]}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </DndContext>
        </div>
      )}
    </div>
  )
}

export default ColumnSortTable