import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { images } from '../../utils/Image'
import CategoryManagement from './categories/CategoryManagement'
import PlotCategory from './categories/PlotCategory'
import Subcategory from './categories/Subcategory'
import CareerCategory from './categories/CareerCategory'
import LeadManagement from './LeadManagement'
import NewProject from './NewProject'

const Dashboard = () => {
  const navigate = useNavigate()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [activeMenu, setActiveMenu] = useState('Dashboard')
  const [expandedMenus, setExpandedMenus] = useState({})

  // Search functionality states
  const [searchData, setSearchData] = useState({
    title: '',
    location: '',
    propertyType: '',
    category: 'COMMERCIAL',
    priceRange: '',
    bedrooms: ''
  })

  // Lead Assignment states
  const [showAssignModal, setShowAssignModal] = useState(false)
  const [showLeadForm, setShowLeadForm] = useState(false)
  const [selectedLead, setSelectedLead] = useState(null)
  const [assignmentData, setAssignmentData] = useState({
    dealerId: '',
    priority: 'medium',
    notes: ''
  })

  // Sample data for leads and dealers
  const [leads, setLeads] = useState([
    {
      id: 1,
      customerName: 'John Doe',
      phone: '+91-9876543210',
      email: 'john@example.com',
      propertyType: 'Apartment',
      location: 'Gurgaon',
      budget: '₹50-75 Lakhs',
      status: 'New',
      date: '2024-01-15',
      assignedTo: null
    },
    {
      id: 2,
      customerName: 'Sarah Smith',
      phone: '+91-9876543211',
      email: 'sarah@example.com',
      propertyType: 'Villa',
      location: 'Delhi',
      budget: '₹1-2 Crores',
      status: 'Hot',
      date: '2024-01-14',
      assignedTo: 'Dealer A'
    },
    {
      id: 3,
      customerName: 'Mike Johnson',
      phone: '+91-9876543212',
      email: 'mike@example.com',
      propertyType: 'Plot',
      location: 'Noida',
      budget: '₹25-40 Lakhs',
      status: 'Warm',
      date: '2024-01-13',
      assignedTo: null
    }
  ])

  // Form data for new lead creation
  const [newLeadForm, setNewLeadForm] = useState({
    customerName: '',
    phone: '',
    email: '',
    propertyType: '',
    location: '',
    budget: '',
    status: 'New',
    source: '',
    dealerId: '',
    followUpDate: '',
    notes: ''
  })

  const [dealers] = useState([
    { id: 'dealer1', name: 'Rajesh Kumar', phone: '+91-9999111111', area: 'Gurgaon', rating: 4.8 },
    { id: 'dealer2', name: 'Priya Sharma', phone: '+91-9999222222', area: 'Delhi', rating: 4.6 },
    { id: 'dealer3', name: 'Amit Singh', phone: '+91-9999333333', area: 'Noida', rating: 4.9 },
    { id: 'dealer4', name: 'Neha Gupta', phone: '+91-9999444444', area: 'Faridabad', rating: 4.7 }
  ])

  const handleLogout = () => {
    navigate('/login')
  }

  const handleMenuClick = (menuName, hasSubmenu = false) => {
    if (hasSubmenu) {
      setExpandedMenus(prev => ({
        ...prev,
        [menuName]: !prev[menuName]
      }))
    } else {
      setActiveMenu(menuName)
    }
  }

  const handleSearchChange = (field, value) => {
    setSearchData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSearch = () => {
    console.log('Search data:', searchData)
    // Implement search logic here
  }

  // Lead Assignment handlers
  const handleAssignLead = (lead) => {
    setSelectedLead(lead)
    setShowAssignModal(true)
    setAssignmentData({
      dealerId: '',
      priority: 'medium',
      notes: ''
    })
  }

  const handleAssignmentSubmit = () => {
    if (!assignmentData.dealerId) {
      alert('Please select a dealer')
      return
    }
    
    const dealer = dealers.find(d => d.id === assignmentData.dealerId)
    
    // Update the lead with assignment
    const updatedLeads = leads.map((lead) => {
      if (lead.id === selectedLead.id) {
        return {
          ...lead,
          assignedTo: dealer.name,
          priority: assignmentData.priority
        }
      }
      return lead
    })
    
    setLeads(updatedLeads)
    alert(`Lead assigned to ${dealer.name} successfully!`)
    setShowAssignModal(false)
    setSelectedLead(null)
  }

  const handleNewLeadSubmit = (e) => {
    e.preventDefault()
    
    // Validate required fields
    if (!newLeadForm.customerName || !newLeadForm.phone || !newLeadForm.propertyType || !newLeadForm.location || !newLeadForm.budget) {
      alert('Please fill all required fields')
      return
    }

    // Get dealer name if assigned
    const assignedDealer = newLeadForm.dealerId 
      ? dealers.find(d => d.id === newLeadForm.dealerId)?.name 
      : null

    // Create new lead
    const newLead = {
      id: leads.length + 1,
      customerName: newLeadForm.customerName,
      phone: newLeadForm.phone,
      email: newLeadForm.email,
      propertyType: newLeadForm.propertyType,
      location: newLeadForm.location,
      budget: newLeadForm.budget,
      status: newLeadForm.status,
      date: new Date().toISOString().split('T')[0],
      assignedTo: assignedDealer
    }

    // Add to leads list
    setLeads([...leads, newLead])
    
    // Reset form
    setNewLeadForm({
      customerName: '',
      phone: '',
      email: '',
      propertyType: '',
      location: '',
      budget: '',
      status: 'New',
      source: '',
      dealerId: '',
      followUpDate: '',
      notes: ''
    })
    
    setShowLeadForm(false)
    alert('Lead created successfully!')
  }

  const handleNewLeadChange = (field, value) => {
    setNewLeadForm(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleClearForm = () => {
    setNewLeadForm({
      customerName: '',
      phone: '',
      email: '',
      propertyType: '',
      location: '',
      budget: '',
      status: 'New',
      source: '',
      dealerId: '',
      followUpDate: '',
      notes: ''
    })
  }

  const handleAssignmentChange = (field, value) => {
    setAssignmentData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const menuItems = [
    { name: 'Dashboard', icon: '📊', active: true },
    { name: 'Category', icon: '📂', submenu: true },
    { name: 'Plot Category', icon: '🏞️' },
    { name: 'Subcategory', icon: '📋' },
    { name: 'Project', icon: '🏗️', submenu: true,
      subItems: [
        { name: 'Project', icon: '🏗️' },
        { name: 'New Project', icon: '🆕' },
        { name: 'Sold Out Project', icon: '🔴' },
        { name: 'Hot Deal Project', icon: '🔥' },
        { name: 'User Project', icon: '👤' }
      ]
    },
    { name: 'Location', icon: '📍', submenu: true },
    { name: 'User', icon: '👤', submenu: true },
    { name: 'Lead Management', icon: '🎯' },
    { name: 'Lead Assignment', icon: '📊' },
    { name: 'Slider', icon: '🎛️' },
    { name: 'Enquiry', icon: '�' },
    { name: 'Contact', icon: '📞' },
    { name: 'Help Center', icon: '❓' },
    { name: 'Career Category', icon: '💼' },
    { name: 'Blog', icon: '�' },
    { name: 'Newsletter', icon: '�' },
    { name: 'Feedback', icon: '�' },
    { name: 'Advertisement', icon: '📢' },
    { name: 'Post Requirement', icon: '📋' }
  ]

  const renderActiveMenuContent = () => {
    switch (activeMenu) {
      case 'Category':
        return <CategoryManagement />
      case 'Plot Category':
        return <PlotCategory />
      case 'Subcategory':
        return <Subcategory />
      case 'Career Category':
        return <CareerCategory />
      case 'Lead Management':
        return <LeadManagement />
      case 'New Project':
        return <NewProject />
      case 'Lead Assignment':
        return renderLeadAssignmentContent()
      default:
        return renderDashboardContent()
    }
  }

  const renderLeadAssignmentContent = () => (
    <>
      {/* Lead Assignment Form Toggle */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base sm:text-lg font-semibold text-gray-800">Lead Assignment Management</h3>
          <button
            onClick={() => setShowLeadForm(!showLeadForm)}
            className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md font-medium transition-colors"
          >
            <svg className={`w-5 h-5 transform transition-transform ${showLeadForm ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
            <span>{showLeadForm ? 'Hide Form' : 'Create New Lead'}</span>
          </button>
        </div>

        {/* Collapsible Form */}
        {showLeadForm && (
          <div className="border-t pt-4 animate-in slide-in-from-top-2 duration-300">
            <form onSubmit={handleNewLeadSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Customer Information */}
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-700 border-b pb-2">Customer Information</h4>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Customer Name <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      value={newLeadForm.customerName}
                      onChange={(e) => handleNewLeadChange('customerName', e.target.value)}
                      placeholder="Enter customer name"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number <span className="text-red-500">*</span></label>
                    <input
                      type="tel"
                      value={newLeadForm.phone}
                      onChange={(e) => handleNewLeadChange('phone', e.target.value)}
                      placeholder="+91-9999999999"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      value={newLeadForm.email}
                      onChange={(e) => handleNewLeadChange('email', e.target.value)}
                      placeholder="customer@example.com"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Lead Source</label>
                    <select 
                      value={newLeadForm.source}
                      onChange={(e) => handleNewLeadChange('source', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    >
                      <option value="">Select source...</option>
                      <option value="website">Website</option>
                      <option value="referral">Referral</option>
                      <option value="social-media">Social Media</option>
                      <option value="advertisement">Advertisement</option>
                      <option value="walk-in">Walk-in</option>
                      <option value="phone-call">Phone Call</option>
                    </select>
                  </div>
                </div>

                {/* Property Requirements */}
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-700 border-b pb-2">Property Requirements</h4>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Property Type <span className="text-red-500">*</span></label>
                    <select 
                      value={newLeadForm.propertyType}
                      onChange={(e) => handleNewLeadChange('propertyType', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      required
                    >
                      <option value="">Select property type...</option>
                      <option value="Apartment">Apartment</option>
                      <option value="Villa">Villa</option>
                      <option value="Plot">Plot</option>
                      <option value="Commercial">Commercial</option>
                      <option value="Office Space">Office Space</option>
                      <option value="Warehouse">Warehouse</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Location <span className="text-red-500">*</span></label>
                    <select 
                      value={newLeadForm.location}
                      onChange={(e) => handleNewLeadChange('location', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      required
                    >
                      <option value="">Select location...</option>
                      <option value="Gurgaon">Gurgaon</option>
                      <option value="Delhi">Delhi</option>
                      <option value="Noida">Noida</option>
                      <option value="Faridabad">Faridabad</option>
                      <option value="Ghaziabad">Ghaziabad</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Budget Range <span className="text-red-500">*</span></label>
                    <select 
                      value={newLeadForm.budget}
                      onChange={(e) => handleNewLeadChange('budget', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      required
                    >
                      <option value="">Select budget range...</option>
                      <option value="₹25-40 Lakhs">₹25-40 Lakhs</option>
                      <option value="₹40-60 Lakhs">₹40-60 Lakhs</option>
                      <option value="₹60-80 Lakhs">₹60-80 Lakhs</option>
                      <option value="₹80-100 Lakhs">₹80-100 Lakhs</option>
                      <option value="₹1-2 Crores">₹1-2 Crores</option>
                      <option value="₹2-5 Crores">₹2-5 Crores</option>
                      <option value="₹5+ Crores">₹5+ Crores</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Lead Priority</label>
                    <select 
                      value={newLeadForm.status}
                      onChange={(e) => handleNewLeadChange('status', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    >
                      <option value="New">New</option>
                      <option value="Warm">Warm</option>
                      <option value="Hot">Hot</option>
                      <option value="Urgent">Urgent</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Assignment Section */}
              <div className="border-t pt-4">
                <h4 className="font-medium text-gray-700 mb-4">Assignment Details</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Assign to Dealer</label>
                    <select 
                      value={newLeadForm.dealerId}
                      onChange={(e) => handleNewLeadChange('dealerId', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    >
                      <option value="">Auto-assign or select dealer...</option>
                      {dealers.map((dealer) => (
                        <option key={dealer.id} value={dealer.id}>
                          {dealer.name} - {dealer.area} (Rating: {dealer.rating}⭐)
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Follow-up Date</label>
                    <input
                      type="date"
                      value={newLeadForm.followUpDate}
                      onChange={(e) => handleNewLeadChange('followUpDate', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Special Instructions / Notes</label>
                  <textarea
                    rows={3}
                    value={newLeadForm.notes}
                    onChange={(e) => handleNewLeadChange('notes', e.target.value)}
                    placeholder="Add any special requirements, preferences, or notes about this lead..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3 pt-4 border-t">
                <button
                  type="submit"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-md font-medium transition-colors"
                >
                  Create & Assign Lead
                </button>
                <button
                  type="button"
                  onClick={() => setShowLeadForm(false)}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-2 rounded-md font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleClearForm}
                  className="border border-gray-300 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-50 transition-colors"
                >
                  Clear Form
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      {/* Existing Leads Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 mb-6">
        <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-4">Existing Property Leads</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Property Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Budget</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned To</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {leads.map((lead) => (
                <tr key={lead.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{lead.customerName}</div>
                      <div className="text-sm text-gray-500">{lead.phone}</div>
                      <div className="text-sm text-gray-500">{lead.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{lead.propertyType}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{lead.location}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{lead.budget}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      lead.status === 'Hot' ? 'bg-red-100 text-red-800' :
                      lead.status === 'Warm' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {lead.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {lead.assignedTo || 'Unassigned'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleAssignLead(lead)}
                      className="text-indigo-600 hover:text-indigo-900 bg-indigo-50 hover:bg-indigo-100 px-3 py-1 rounded-md transition-colors"
                    >
                      {lead.assignedTo ? 'Reassign' : 'Assign Lead'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )

  const renderDashboardContent = () => (
    <>
      {/* Company Info Card */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex flex-col lg:flex-row items-center lg:items-start space-y-4 lg:space-y-0 lg:space-x-6">
          {/* Company Logo */}
          <div className="flex-shrink-0">
            <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-blue-50 to-green-50 rounded-full flex items-center justify-center p-4 shadow-lg border-4 border-cyan-200">
              <img src={images.companyLogo} alt="Maigreat Group Logo" className="w-full h-full object-contain"/>
            </div>
          </div>

          {/* Company Details */}
          <div className="flex-1 text-center lg:text-left">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">Maigreat Group</h2>
            <p className="text-gray-500 text-sm mb-4">maigreat</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="font-medium text-gray-700 mb-1">Mobile</div>
                <div className="text-gray-600">+91-9999530797</div>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="font-medium text-gray-700 mb-1">Email</div>
                <div className="text-gray-600">info@maigreat.com</div>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg sm:col-span-2 lg:col-span-1">
                <div className="font-medium text-gray-700 mb-1">City</div>
                <div className="text-gray-600">Plot no 113 sector 44 Gurgaon Haryana 122002</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Users</p>
              <p className="text-2xl font-bold text-blue-600">1,234</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">👥</span>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Properties</p>
              <p className="text-2xl font-bold text-green-600">567</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">🏠</span>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Enquiries</p>
              <p className="text-2xl font-bold text-yellow-600">89</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">💬</span>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Revenue</p>
              <p className="text-2xl font-bold text-purple-600">₹89,012</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">💰</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-600 text-sm">👤</span>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-800">New user registered</p>
              <p className="text-xs text-gray-500">2 minutes ago</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-green-600 text-sm">🏠</span>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-800">New property listed</p>
              <p className="text-xs text-gray-500">15 minutes ago</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
              <span className="text-yellow-600 text-sm">💬</span>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-800">New enquiry received</p>
              <p className="text-xs text-gray-500">1 hour ago</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
              <span className="text-purple-600 text-sm">💰</span>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-800">Payment received</p>
              <p className="text-xs text-gray-500">2 hours ago</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
              <span className="text-red-600 text-sm">🚨</span>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-800">System maintenance scheduled</p>
              <p className="text-xs text-gray-500">3 hours ago</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
              <span className="text-indigo-600 text-sm">📊</span>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-800">Monthly report generated</p>
              <p className="text-xs text-gray-500">4 hours ago</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center">
              <span className="text-pink-600 text-sm">📧</span>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-800">Newsletter sent to subscribers</p>
              <p className="text-xs text-gray-500">5 hours ago</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center">
              <span className="text-teal-600 text-sm">🔧</span>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-800">System update completed</p>
              <p className="text-xs text-gray-500">6 hours ago</p>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Content for Scrolling Demo */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 mb-6">
        <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          <button className="p-4 bg-blue-50 hover:bg-blue-100 rounded-lg text-center transition-colors">
            <div className="text-2xl mb-2">👥</div>
            <div className="text-sm font-medium text-gray-700">Add User</div>
          </button>
          <button className="p-4 bg-green-50 hover:bg-green-100 rounded-lg text-center transition-colors">
            <div className="text-2xl mb-2">🏠</div>
            <div className="text-sm font-medium text-gray-700">Add Property</div>
          </button>
          <button className="p-4 bg-yellow-50 hover:bg-yellow-100 rounded-lg text-center transition-colors">
            <div className="text-2xl mb-2">📊</div>
            <div className="text-sm font-medium text-gray-700">View Reports</div>
          </button>
          <button className="p-4 bg-purple-50 hover:bg-purple-100 rounded-lg text-center transition-colors">
            <div className="text-2xl mb-2">⚙️</div>
            <div className="text-sm font-medium text-gray-700">Settings</div>
          </button>
        </div>
      </div>

      {/* More Content */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
        <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-4">System Status</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm font-medium text-gray-700">Database</span>
            </div>
            <span className="text-sm text-green-600 font-medium">Online</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm font-medium text-gray-700">API Server</span>
            </div>
            <span className="text-sm text-green-600 font-medium">Online</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span className="text-sm font-medium text-gray-700">Email Service</span>
            </div>
            <span className="text-sm text-yellow-600 font-medium">Maintenance</span>
          </div>
        </div>
      </div>
    </>
  )

  return (
    <div className="h-screen bg-gray-50 flex overflow-hidden">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 lg:shadow-none flex flex-col`}>
        {/* Logo Section */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 flex-shrink-0">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">M</span>
            </div>
            <span className="text-lg font-semibold text-gray-800">maigreat</span>
          </div>
          <button 
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden p-1 rounded-md hover:bg-gray-100"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Navigation Menu - Scrollable */}
        <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          {menuItems.map((item, index) => (
            <div key={index}>
              <button
                onClick={() => handleMenuClick(item.name, item.submenu)}
                className={`w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                  activeMenu === item.name || (item.subItems && item.subItems.some(subItem => activeMenu === subItem.name))
                    ? 'bg-green-50 text-green-700 border-r-2 border-green-500'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-lg">{item.icon}</span>
                  <span>{item.name}</span>
                </div>
                {item.submenu && (
                  <svg className={`w-4 h-4 transition-transform duration-200 ${expandedMenus[item.name] ? 'rotate-90' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                )}
              </button>
              
              {/* Submenu Items */}
              {item.submenu && item.subItems && expandedMenus[item.name] && (
                <div className="ml-6 mt-1 space-y-1">
                  {item.subItems.map((subItem, subIndex) => (
                    <button
                      key={subIndex}
                      onClick={() => setActiveMenu(subItem.name)}
                      className={`w-full flex items-center space-x-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                        activeMenu === subItem.name
                          ? 'bg-green-100 text-green-800 border-l-2 border-green-500'
                          : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
                      }`}
                    >
                      <span className="text-base">{subItem.icon}</span>
                      <span>{subItem.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 lg:ml-0 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 flex-shrink-0">
          <div className="flex items-center justify-between h-16 px-4 sm:px-6">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="lg:hidden p-2 rounded-md hover:bg-gray-100"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <h1 className="text-xl font-semibold text-gray-800">{activeMenu}</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <div className="w-6 h-6 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-xs">M</span>
                </div>
                <span className="hidden sm:inline">Maigreat Group</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              <button
                onClick={handleLogout}
                className="px-3 py-1.5 text-sm bg-red-500 hover:bg-red-600 text-white rounded-md transition-colors duration-200"
              >
                Logout
              </button>
            </div>
          </div>
        </header>

        {/* Dashboard Content - Scrollable */}
        <main className="flex-1 overflow-y-auto p-3 sm:p-4 lg:p-6 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          <div className="max-w-7xl mx-auto">
            {renderActiveMenuContent()}
          </div>
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Lead Assignment Modal */}
      {showAssignModal && (
        <div className="fixed inset-0 bg-gray-100 bg-opacity-75 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Assign Property Lead to Dealer</h3>
                <button
                  onClick={() => setShowAssignModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {selectedLead && (
                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-800 mb-2">Lead Details</h4>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p><span className="font-medium">Customer:</span> {selectedLead.customerName}</p>
                    <p><span className="font-medium">Phone:</span> {selectedLead.phone}</p>
                    <p><span className="font-medium">Property Type:</span> {selectedLead.propertyType}</p>
                    <p><span className="font-medium">Location:</span> {selectedLead.location}</p>
                    <p><span className="font-medium">Budget:</span> {selectedLead.budget}</p>
                  </div>
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Select Dealer <span className="text-red-500">*</span></label>
                  <select
                    value={assignmentData.dealerId}
                    onChange={(e) => handleAssignmentChange('dealerId', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option value="">Choose a dealer...</option>
                    {dealers.map((dealer) => (
                      <option key={dealer.id} value={dealer.id}>
                        {dealer.name} - {dealer.area} (Rating: {dealer.rating}⭐)
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Priority Level</label>
                  <select
                    value={assignmentData.priority}
                    onChange={(e) => handleAssignmentChange('priority', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option value="low">Low Priority</option>
                    <option value="medium">Medium Priority</option>
                    <option value="high">High Priority</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Assignment Notes</label>
                  <textarea
                    value={assignmentData.notes}
                    onChange={(e) => handleAssignmentChange('notes', e.target.value)}
                    placeholder="Add any special instructions or notes for the dealer..."
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                  />
                </div>

                {assignmentData.dealerId && (
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h5 className="font-medium text-blue-800 mb-2">Selected Dealer Info</h5>
                    {(() => {
                      const dealer = dealers.find(d => d.id === assignmentData.dealerId);
                      return dealer ? (
                        <div className="space-y-1 text-sm text-blue-700">
                          <p><span className="font-medium">Name:</span> {dealer.name}</p>
                          <p><span className="font-medium">Phone:</span> {dealer.phone}</p>
                          <p><span className="font-medium">Area:</span> {dealer.area}</p>
                          <p><span className="font-medium">Rating:</span> {dealer.rating}⭐</p>
                        </div>
                      ) : null;
                    })()}
                  </div>
                )}
              </div>

              <div className="flex space-x-3 mt-6">
                <button
                  onClick={handleAssignmentSubmit}
                  className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md font-medium transition-colors"
                >
                  Assign Lead to Dealer
                </button>
                <button
                  onClick={() => setShowAssignModal(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Dashboard