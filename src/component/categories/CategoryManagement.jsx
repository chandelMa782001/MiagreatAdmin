import { useState } from 'react'

const CategoryManagement = () => {
  const [categories, setCategories] = useState([
    { id: 1, name: 'Residential', type: 'Property', status: 'Active', count: 45 },
    { id: 2, name: 'Commercial', type: 'Property', status: 'Active', count: 23 },
    { id: 3, name: 'Industrial', type: 'Property', status: 'Active', count: 12 },
    { id: 4, name: 'Agricultural', type: 'Property', status: 'Inactive', count: 8 }
  ])

  const [showAddForm, setShowAddForm] = useState(false)
  const [newCategory, setNewCategory] = useState({
    name: '',
    type: 'Property',
    description: ''
  })

  const handleAddCategory = (e) => {
    e.preventDefault()
    if (!newCategory.name.trim()) return

    const category = {
      id: Date.now(),
      name: newCategory.name,
      type: newCategory.type,
      status: 'Active',
      count: 0
    }

    setCategories([...categories, category])
    setNewCategory({ name: '', type: 'Property', description: '' })
    setShowAddForm(false)
  }

  const toggleCategoryStatus = (id) => {
    setCategories(categories.map(cat => 
      cat.id === id 
        ? { ...cat, status: cat.status === 'Active' ? 'Inactive' : 'Active' }
        : cat
    ))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Category Management</h2>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md font-medium transition-colors"
        >
          {showAddForm ? 'Cancel' : 'Add Category'}
        </button>
      </div>

      {/* Add Category Form */}
      {showAddForm && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Add New Category</h3>
          <form onSubmit={handleAddCategory} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={newCategory.name}
                  onChange={(e) => setNewCategory({...newCategory, name: e.target.value})}
                  placeholder="Enter category name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category Type
                </label>
                <select
                  value={newCategory.type}
                  onChange={(e) => setNewCategory({...newCategory, type: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="Property">Property</option>
                  <option value="Location">Location</option>
                  <option value="Service">Service</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                value={newCategory.description}
                onChange={(e) => setNewCategory({...newCategory, description: e.target.value})}
                placeholder="Enter category description"
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="flex space-x-3">
              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-md font-medium transition-colors"
              >
                Add Category
              </button>
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-2 rounded-md font-medium transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Existing Categories</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Items Count
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {categories.map((category) => (
                <tr key={category.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{category.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                      {category.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {category.count} items
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      category.status === 'Active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {category.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button
                      onClick={() => toggleCategoryStatus(category.id)}
                      className={`px-3 py-1 rounded-md transition-colors ${
                        category.status === 'Active'
                          ? 'text-red-600 hover:text-red-900 bg-red-50 hover:bg-red-100'
                          : 'text-green-600 hover:text-green-900 bg-green-50 hover:bg-green-100'
                      }`}
                    >
                      {category.status === 'Active' ? 'Deactivate' : 'Activate'}
                    </button>
                    <button className="text-indigo-600 hover:text-indigo-900 bg-indigo-50 hover:bg-indigo-100 px-3 py-1 rounded-md transition-colors">
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default CategoryManagement