import { useState } from 'react'

const Subcategory = () => {
  const [subcategories, setSubcategories] = useState([
    { id: 1, name: 'Apartment', parentCategory: 'Residential', description: '1-4 BHK apartments', count: 25, status: 'Active' },
    { id: 2, name: 'Villa', parentCategory: 'Residential', description: 'Independent villas', count: 15, status: 'Active' },
    { id: 3, name: 'Office Space', parentCategory: 'Commercial', description: 'Commercial office spaces', count: 18, status: 'Active' },
    { id: 4, name: 'Retail Shop', parentCategory: 'Commercial', description: 'Retail and shop spaces', count: 12, status: 'Active' },
    { id: 5, name: 'Warehouse', parentCategory: 'Industrial', description: 'Storage and warehouse facilities', count: 8, status: 'Inactive' }
  ])

  const [categories] = useState([
    'Residential', 'Commercial', 'Industrial', 'Agricultural'
  ])

  const [showAddForm, setShowAddForm] = useState(false)
  const [newSubcategory, setNewSubcategory] = useState({
    name: '',
    parentCategory: 'Residential',
    description: ''
  })

  const handleAddSubcategory = (e) => {
    e.preventDefault()
    if (!newSubcategory.name.trim()) return

    const subcategory = {
      id: Date.now(),
      name: newSubcategory.name,
      parentCategory: newSubcategory.parentCategory,
      description: newSubcategory.description,
      count: 0,
      status: 'Active'
    }

    setSubcategories([...subcategories, subcategory])
    setNewSubcategory({ name: '', parentCategory: 'Residential', description: '' })
    setShowAddForm(false)
  }

  const toggleSubcategoryStatus = (id) => {
    setSubcategories(subcategories.map(sub => 
      sub.id === id 
        ? { ...sub, status: sub.status === 'Active' ? 'Inactive' : 'Active' }
        : sub
    ))
  }

  const getSubcategoriesByParent = (parentCategory) => {
    return subcategories.filter(sub => sub.parentCategory === parentCategory)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Subcategory Management</h2>
          <p className="text-gray-600 mt-1">Manage subcategories under main property categories</p>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md font-medium transition-colors"
        >
          {showAddForm ? 'Cancel' : 'Add Subcategory'}
        </button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {categories.map((category) => {
          const categorySubcategories = getSubcategoriesByParent(category)
          const totalCount = categorySubcategories.reduce((sum, sub) => sum + sub.count, 0)
          
          return (
            <div key={category} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-800">{category}</h3>
                <p className="text-2xl font-bold text-indigo-600 mt-2">{categorySubcategories.length}</p>
                <p className="text-sm text-gray-600">Subcategories</p>
                <p className="text-sm text-gray-500 mt-1">{totalCount} total items</p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Add Subcategory Form */}
      {showAddForm && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Add New Subcategory</h3>
          <form onSubmit={handleAddSubcategory} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Subcategory Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={newSubcategory.name}
                  onChange={(e) => setNewSubcategory({...newSubcategory, name: e.target.value})}
                  placeholder="Enter subcategory name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Parent Category <span className="text-red-500">*</span>
                </label>
                <select
                  value={newSubcategory.parentCategory}
                  onChange={(e) => setNewSubcategory({...newSubcategory, parentCategory: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                value={newSubcategory.description}
                onChange={(e) => setNewSubcategory({...newSubcategory, description: e.target.value})}
                placeholder="Enter subcategory description"
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div className="flex space-x-3">
              <button
                type="submit"
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-md font-medium transition-colors"
              >
                Add Subcategory
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

      {/* Subcategories by Parent Category */}
      {categories.map((category) => {
        const categorySubcategories = getSubcategoriesByParent(category)
        
        if (categorySubcategories.length === 0) return null

        return (
          <div key={category} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <span className="text-2xl mr-2">
                {category === 'Residential' ? '🏠' : 
                 category === 'Commercial' ? '🏢' : 
                 category === 'Industrial' ? '🏭' : '🌾'}
              </span>
              {category} Subcategories ({categorySubcategories.length})
            </h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Subcategory Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Description
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
                  {categorySubcategories.map((subcategory) => (
                    <tr key={subcategory.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{subcategory.name}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">{subcategory.description}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {subcategory.count} items
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          subcategory.status === 'Active' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {subcategory.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                        <button
                          onClick={() => toggleSubcategoryStatus(subcategory.id)}
                          className={`px-3 py-1 rounded-md transition-colors ${
                            subcategory.status === 'Active'
                              ? 'text-red-600 hover:text-red-900 bg-red-50 hover:bg-red-100'
                              : 'text-green-600 hover:text-green-900 bg-green-50 hover:bg-green-100'
                          }`}
                        >
                          {subcategory.status === 'Active' ? 'Deactivate' : 'Activate'}
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
        )
      })}
    </div>
  )
}

export default Subcategory