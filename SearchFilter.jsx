/**
 * A generic search + filter bar.
 *
 * `fields` describes each control:
 *   { type: 'search', key: 'search', placeholder: '...' }
 *   { type: 'select', key: 'department', placeholder: 'All Departments', options: [...] }
 *   { type: 'date', key: 'date' }
 */
function SearchFilter({ fields, values, onChange, onClear }) {
  const handleChange = (key, value) => {
    onChange({ ...values, [key]: value })
  }

  return (
    <div className="search-filter-bar">
      {fields.map((field) => {
        if (field.type === 'select') {
          return (
            <select
              key={field.key}
              value={values[field.key] || ''}
              onChange={(e) => handleChange(field.key, e.target.value)}
            >
              <option value="">{field.placeholder}</option>
              {field.options.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          )
        }

        return (
          <input
            key={field.key}
            type={field.type}
            placeholder={field.placeholder}
            value={values[field.key] || ''}
            onChange={(e) => handleChange(field.key, e.target.value)}
          />
        )
      })}
      <button type="button" className="btn btn-secondary" onClick={onClear}>
        Clear Filters
      </button>
    </div>
  )
}

export default SearchFilter
