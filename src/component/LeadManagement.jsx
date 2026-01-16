import { useState } from 'react'
const LeadManagement = () => {
  const [showLeadForm, setShowLeadForm] = useState(false)
  const [searchName, setSearchName] = useState('')
  const [selectedAssignTo, setSelectedAssignTo] = useState('')
  const [selectedLeads, setSelectedLeads] = useState([])
  const [editingLead, setEditingLead] = useState(null)
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    alternateMobile: '',
    email: '',
    dob: '',
    gender: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    pincode: '',
    status: '',
    source: '',
    productType: '',
    followUpDate: '',
    followUpTime: '',
    description: '',
    assignTo: ''
  })

  // Sample data
  const [leads, setLeads] = useState([
    {
      id: 1,
      name: 'Dev',
      email: 'abc@gmail.com',
      mobile: '9911223344',
      status: 'Active',
      followUp: '16-07-2020 01:00 PM',
      assignTo: 'Bikash karmakar',
      lastUpdate: '14-07-2020 02:00 AM',
      createdBy: 'Super Admin',
      createdDate: '24/07/2020'
    },
    {
      id: 2,
      name: 'Anshul Berry',
      email: 'anshul@gmail.com',
      mobile: '9900112233',
      status: 'Active',
      followUp: '20-07-2020 03:00 PM',
      assignTo: 'Rajesh Kumar',
      lastUpdate: '18-07-2020 10:00 AM',
      createdBy: 'Admin',
      createdDate: '15/07/2020'
    }
  ])

  const [users] = useState([
    { id: 'user1', name: 'Bikash karmakar' },
    { id: 'user2', name: 'Rajesh Kumar' },
    { id: 'user3', name: 'Priya Sharma' },
    { id: 'user4', name: 'Amit Singh' }
  ])

  const handleFormChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (editingLead) {
      // Update existing lead
      const updatedLeads = leads.map(lead => {
        if (lead.id === editingLead.id) {
          return {
            ...lead,
            name: formData.name,
            email: formData.email,
            mobile: formData.mobile,
            status: formData.status || 'Active',
            followUp: formData.followUpDate && formData.followUpTime 
              ? `${formData.followUpDate} ${formData.followUpTime}` 
              : lead.followUp,
            assignTo: users.find(u => u.id === formData.assignTo)?.name || lead.assignTo,
            lastUpdate: new Date().toLocaleString()
          }
        }
        return lead
      })
      
      setLeads(updatedLeads)
      alert('Lead updated successfully!')
      setEditingLead(null)
    } else {
      // Create new lead
      const newLead = {
        id: leads.length + 1,
        name: formData.name,
        email: formData.email,
        mobile: formData.mobile,
        status: formData.status || 'Active',
        followUp: formData.followUpDate && formData.followUpTime 
          ? `${formData.followUpDate} ${formData.followUpTime}` 
          : 'Not Set',
        assignTo: users.find(u => u.id === formData.assignTo)?.name || 'Unassigned',
        lastUpdate: new Date().toLocaleString(),
        createdBy: 'Current User',
        createdDate: new Date().toLocaleDateString()
      }
      
      setLeads([...leads, newLead])
      alert('Lead created successfully!')
    }
    
    handleReset()
    setShowLeadForm(false)
  }

  const handleEdit = (lead) => {
    setEditingLead(lead)
    setFormData({
      name: lead.name,
      mobile: lead.mobile,
      alternateMobile: '',
      email: lead.email,
      dob: '',
      gender: '',
      address1: '',
      address2: '',
      city: '',
      state: '',
      pincode: '',
      status: lead.status,
      source: '',
      productType: '',
      followUpDate: '',
      followUpTime: '',
      description: '',
      assignTo: users.find(u => u.name === lead.assignTo)?.id || ''
    })
    setShowLeadForm(true)
  }

  const handleDelete = (leadId) => {
    if (window.confirm('Are you sure you want to delete this lead?')) {
      setLeads(leads.filter(lead => lead.id !== leadId))
      alert('Lead deleted successfully!')
    }
  }

  const handleReset = () => {
    setFormData({
      name: '',
      mobile: '',
      alternateMobile: '',
      email: '',
      dob: '',
      gender: '',
      address1: '',
      address2: '',
      city: '',
      state: '',
      pincode: '',
      status: '',
      source: '',
      productType: '',
      followUpDate: '',
      followUpTime: '',
      description: '',
      assignTo: ''
    })
    setEditingLead(null)
  }

  const handleLeadSelection = (leadId) => {
    setSelectedLeads(prev => {
      if (prev.includes(leadId)) {
        return prev.filter(id => id !== leadId)
      } else {
        return [...prev, leadId]
      }
    })
  }

  const handleBulkAssign = () => {
    if (!selectedAssignTo) {
      alert('Please select a user to assign')
      return
    }
    if (selectedLeads.length === 0) {
      alert('Please select at least one lead')
      return
    }
    
    const assignedUser = users.find(u => u.id === selectedAssignTo)
    
    // Update selected leads with new assignment
    const updatedLeads = leads.map(lead => {
      if (selectedLeads.includes(lead.id)) {
        return {
          ...lead,
          assignTo: assignedUser.name,
          lastUpdate: new Date().toLocaleString()
        }
      }
      return lead
    })
    
    setLeads(updatedLeads)
    alert(`${selectedLeads.length} lead(s) assigned to ${assignedUser.name}`)
    setSelectedLeads([])
    setSelectedAssignTo('')
  }

  const filteredLeads = leads.filter(lead => 
    lead.name.toLowerCase().includes(searchName.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Search and Filter Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          {/* Search by Name */}
          <div className="flex-1 w-full">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search by Name"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Filter Icon */}
          <button className="p-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
          </button>
        </div>

        {/* Bulk Assign Section */}
        <div className="mt-4 flex flex-col md:flex-row gap-3 items-center">
          <div className="flex-1 w-full">
            <div className="flex items-center bg-gray-100 rounded-full overflow-hidden">
              <div className="px-4 py-3 bg-gray-600 text-white">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <select
                value={selectedAssignTo}
                onChange={(e) => setSelectedAssignTo(e.target.value)}
                className="flex-1 px-4 py-3 bg-white border-0 focus:outline-none text-gray-700"
              >
                <option value="">Select Assign To</option>
                {users.map(user => (
                  <option key={user.id} value={user.id}>{user.name}</option>
                ))}
              </select>
            </div>
          </div>
          
          <button
            onClick={handleBulkAssign}
            className="px-8 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-full transition-colors"
          >
            Save
          </button>

          <div className="px-6 py-3 bg-green-500 text-white font-semibold rounded-lg">
            Total Leads<br />
            <span className="text-2xl">{leads.length}</span>
          </div>
        </div>
      </div>

      {/* Create Lead Form Toggle */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <button
          onClick={() => setShowLeadForm(!showLeadForm)}
          className="w-full flex items-center justify-between p-4 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors"
        >
          <span className="text-lg font-semibold text-indigo-700">
            {showLeadForm ? 'Hide' : editingLead ? 'Edit Lead' : 'Create New Lead'}
          </span>
          <svg 
            className={`w-6 h-6 text-indigo-700 transform transition-transform ${showLeadForm ? 'rotate-180' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* Lead Creation Form */}
        {showLeadForm && (
          <form onSubmit={handleSubmit} className="mt-6 space-y-6">
            {/* Personal Information */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-2">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleFormChange('name', e.target.value)}
                  placeholder="Anshul Berry"
                  className="w-full px-4 py-3 border-b-2 border-gray-300 focus:border-indigo-500 focus:outline-none text-gray-900"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-500 mb-2">Mobile Number</label>
                <input
                  type="tel"
                  value={formData.mobile}
                  onChange={(e) => handleFormChange('mobile', e.target.value)}
                  placeholder="9900112233"
                  className="w-full px-4 py-3 border-b-2 border-gray-300 focus:border-indigo-500 focus:outline-none text-gray-900"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-500 mb-2">Alternate Mobile Number</label>
                <input
                  type="tel"
                  value={formData.alternateMobile}
                  onChange={(e) => handleFormChange('alternateMobile', e.target.value)}
                  placeholder="9900112233"
                  className="w-full px-4 py-3 border-b-2 border-gray-300 focus:border-indigo-500 focus:outline-none text-gray-900"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-500 mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleFormChange('email', e.target.value)}
                  placeholder="abc@gmail.com"
                  className="w-full px-4 py-3 border-b-2 border-gray-300 focus:border-indigo-500 focus:outline-none text-gray-900"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-2">Date of Birth</label>
                  <input
                    type="text"
                    value={formData.dob}
                    onChange={(e) => handleFormChange('dob', e.target.value)}
                    placeholder="09 / 05 / 1990"
                    className="w-full px-4 py-3 border-b-2 border-gray-300 focus:border-indigo-500 focus:outline-none text-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-2">Gender</label>
                  <input
                    type="text"
                    value={formData.gender}
                    onChange={(e) => handleFormChange('gender', e.target.value)}
                    placeholder="Male"
                    className="w-full px-4 py-3 border-b-2 border-gray-300 focus:border-indigo-500 focus:outline-none text-gray-900"
                  />
                </div>
              </div>
            </div>

            {/* Address Information */}
            <div className="space-y-4 pt-4 border-t">
              <h3 className="text-sm font-medium text-gray-500">Address Information</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-2">Address 1</label>
                <input
                  type="text"
                  value={formData.address1}
                  onChange={(e) => handleFormChange('address1', e.target.value)}
                  placeholder="Enter Address 1"
                  className="w-full px-4 py-3 border-b-2 border-gray-300 focus:border-indigo-500 focus:outline-none text-gray-900"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-500 mb-2">Address 2</label>
                <input
                  type="text"
                  value={formData.address2}
                  onChange={(e) => handleFormChange('address2', e.target.value)}
                  placeholder="Enter Address 2"
                  className="w-full px-4 py-3 border-b-2 border-gray-300 focus:border-indigo-500 focus:outline-none text-gray-900"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-500 mb-2">City</label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => handleFormChange('city', e.target.value)}
                  placeholder="Enter City"
                  className="w-full px-4 py-3 border-b-2 border-gray-300 focus:border-indigo-500 focus:outline-none text-gray-900"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-500 mb-2">State</label>
                <input
                  type="text"
                  value={formData.state}
                  onChange={(e) => handleFormChange('state', e.target.value)}
                  placeholder="Enter State"
                  className="w-full px-4 py-3 border-b-2 border-gray-300 focus:border-indigo-500 focus:outline-none text-gray-900"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-500 mb-2">Pincode</label>
                <input
                  type="text"
                  value={formData.pincode}
                  onChange={(e) => handleFormChange('pincode', e.target.value)}
                  placeholder="Enter Pincode"
                  className="w-full px-4 py-3 border-b-2 border-gray-300 focus:border-indigo-500 focus:outline-none text-gray-900"
                />
              </div>
            </div>

            {/* Lead Information */}
            <div className="space-y-4 pt-4 border-t">
              <h3 className="text-sm font-medium text-gray-500">Lead Information</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-2">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => handleFormChange('status', e.target.value)}
                  className="w-full px-4 py-3 border-b-2 border-gray-300 focus:border-indigo-500 focus:outline-none text-gray-900 bg-white"
                >
                  <option value="">Select Status</option>
                  <option value="New">New</option>
                  <option value="Active">Active</option>
                  <option value="Hot">Hot</option>
                  <option value="Warm">Warm</option>
                  <option value="Cold">Cold</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-500 mb-2">Source</label>
                <select
                  value={formData.source}
                  onChange={(e) => handleFormChange('source', e.target.value)}
                  className="w-full px-4 py-3 border-b-2 border-gray-300 focus:border-indigo-500 focus:outline-none text-gray-900 bg-white"
                >
                  <option value="">Select Source</option>
                  <option value="Website">Website</option>
                  <option value="Referral">Referral</option>
                  <option value="Social Media">Social Media</option>
                  <option value="Advertisement">Advertisement</option>
                  <option value="Walk-in">Walk-in</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-500 mb-2">Product Type</label>
                <select
                  value={formData.productType}
                  onChange={(e) => handleFormChange('productType', e.target.value)}
                  className="w-full px-4 py-3 border-b-2 border-gray-300 focus:border-indigo-500 focus:outline-none text-gray-900 bg-white"
                >
                  <option value="">Select Product Type</option>
                  <option value="Apartment">Apartment</option>
                  <option value="Villa">Villa</option>
                  <option value="Plot">Plot</option>
                  <option value="Commercial">Commercial</option>
                  <option value="Office">Office Space</option>
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-2">Follow up Date</label>
                  <div className="relative">
                    <input
                      type="date"
                      value={formData.followUpDate}
                      onChange={(e) => handleFormChange('followUpDate', e.target.value)}
                      className="w-full px-4 py-3 border-b-2 border-gray-300 focus:border-indigo-500 focus:outline-none text-gray-900"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-2">Follow up Time</label>
                  <div className="relative">
                    <input
                      type="time"
                      value={formData.followUpTime}
                      onChange={(e) => handleFormChange('followUpTime', e.target.value)}
                      className="w-full px-4 py-3 border-b-2 border-gray-300 focus:border-indigo-500 focus:outline-none text-gray-900"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-500 mb-2">Assign To</label>
                <select
                  value={formData.assignTo}
                  onChange={(e) => handleFormChange('assignTo', e.target.value)}
                  className="w-full px-4 py-3 border-b-2 border-gray-300 focus:border-indigo-500 focus:outline-none text-gray-900 bg-white"
                >
                  <option value="">Select User</option>
                  {users.map(user => (
                    <option key={user.id} value={user.id}>{user.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Lead Description */}
            <div className="space-y-4 pt-4 border-t">
              <h3 className="text-sm font-medium text-gray-500">Lead Description</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-2">Description *</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleFormChange('description', e.target.value)}
                  placeholder="Please Enter Description"
                  rows={6}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none text-gray-900 resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-500 mb-2">Attach File</label>
                <button
                  type="button"
                  className="px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-full transition-colors flex items-center space-x-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <span>Upload File</span>
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t">
              <button
                type="submit"
                className="flex-1 px-8 py-4 bg-green-500 hover:bg-green-600 text-white font-bold text-lg rounded-lg transition-colors"
              >
                {editingLead ? 'Update Lead' : 'Save'}
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="flex-1 px-8 py-4 bg-red-500 hover:bg-red-600 text-white font-bold text-lg rounded-lg transition-colors"
              >
                Reset
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Leads List */}
      <div className="space-y-4">
        {filteredLeads.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900">No leads found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchName ? 'Try adjusting your search' : 'Get started by creating a new lead'}
            </p>
          </div>
        ) : (
          filteredLeads.map(lead => (
            <div key={lead.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start space-x-4">
                <input
                  type="checkbox"
                  checked={selectedLeads.includes(lead.id)}
                  onChange={() => handleLeadSelection(lead.id)}
                  className="mt-1 w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500 cursor-pointer"
                />
                
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <p className="text-gray-700"><span className="font-semibold">Name:</span> {lead.name}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <p className="text-gray-700"><span className="font-semibold">Email:</span> {lead.email}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <p className="text-gray-700"><span className="font-semibold">Mobile:</span> {lead.mobile}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <p className="text-gray-700"><span className="font-semibold">Created By:</span> {lead.createdBy}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <p className="text-gray-700"><span className="font-semibold">Created Date:</span> {lead.createdDate}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="text-gray-700">
                        <span className="font-semibold">Status:</span>{' '}
                        <span className={`inline-block px-3 py-1 text-white rounded-full text-sm ${
                          lead.status === 'Hot' ? 'bg-red-500' :
                          lead.status === 'Warm' ? 'bg-orange-500' :
                          lead.status === 'Cold' ? 'bg-blue-500' :
                          'bg-green-500'
                        }`}>
                          {lead.status}
                        </span>
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="text-gray-700"><span className="font-semibold">Follow up:</span> {lead.followUp}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      <p className="text-gray-700"><span className="font-semibold">Assign To:</span> {lead.assignTo}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="text-gray-700"><span className="font-semibold">Last Update:</span> {lead.lastUpdate}</p>
                    </div>
                    <div className="flex items-center space-x-2 pt-2">
                      <span className="font-semibold text-gray-700">Action:</span>
                      <div className="flex flex-wrap gap-2">
                        <button 
                          onClick={() => handleEdit(lead)}
                          className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg flex items-center space-x-1 transition-colors shadow-sm"
                          title="Edit Lead"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                          <span>Edit</span>
                        </button>
                        <button 
                          onClick={() => handleDelete(lead.id)}
                          className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-sm rounded-lg flex items-center space-x-1 transition-colors shadow-sm"
                          title="Delete Lead"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                          <span>Delete</span>
                        </button>
                        <button 
                          className="px-3 py-1.5 bg-gray-800 hover:bg-gray-900 text-white text-sm rounded-lg flex items-center space-x-1 transition-colors shadow-sm"
                          title="View Details"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                          <span>View</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default LeadManagement
