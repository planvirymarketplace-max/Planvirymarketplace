import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { IMAGES } from '../../data';

export const GuestPortalPage: React.FC = () => {
  const {
    itinerary,
    setItinerary,
    tasks,
    handleToggleTask,
    handleCreateTask,
    newTaskTitle,
    setNewTaskTitle,
    newTaskAssignee,
    setNewTaskAssignee,
    newTaskCategory,
    setNewTaskCategory,
    newTaskPriority,
    setNewTaskPriority,
    newTaskDueDate,
    setNewTaskDueDate,
    newTaskDescription,
    setNewTaskDescription,
    isAddTaskOpen,
    setIsAddTaskOpen,
    collaborators,
    chatMessages,
    setChatMessages,
    chatInput,
    setChatInput,
    splitStrategy,
    setSplitStrategy,
    paymentSentStates,
    handleSendPaymentRequest,
    personalPaymentCompleted,
    setPersonalPaymentCompleted,
    vibeIntimacy,
    setVibeIntimacy,
    vibeOpulence,
    setVibeOpulence,
    vibeActivity,
    setVibeActivity,
    selectedBlueprintTheme,
    setSelectedBlueprintTheme,
    showToast,
    setActivities
  } = useApp();

  const [activeTab, setActiveTab] = useState<'itinerary' | 'split' | 'tasks' | 'vibe'>('itinerary');

  // Interactive review modal state inside guest portal
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [selectedReviewItem, setSelectedReviewItem] = useState<{ id: string; title: string } | null>(null);
  const [userRating, setUserRating] = useState(5);
  const [userComment, setUserComment] = useState('');

  // Settle client's own bill
  const handleSettlePersonalBill = () => {
    setPersonalPaymentCompleted(true);
    showToast("Your cost share has been completed successfully!");
    
    const newAct = {
      id: `act-${Date.now()}`,
      user: 'You',
      action: `settled and completed personal split portion of the itinerary ledger`,
      time: 'Just now',
      icon: 'done_all',
    };
    setActivities(prev => [newAct, ...prev]);
  };

  // Submit Feedback / Reviews
  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedReviewItem) return;

    showToast(`Feedback submitted for ${selectedReviewItem.title}! rating: ${userRating}/5`);
    
    // Log Activity
    const newAct = {
      id: `act-${Date.now()}`,
      user: 'You',
      action: `rated "${selectedReviewItem.title}" ${userRating}/5: "${userComment.slice(0, 30)}..."`,
      time: 'Just now',
      icon: 'rate_review',
    };
    setActivities(prev => [newAct, ...prev]);

    // Close Modal
    setUserComment('');
    setSelectedReviewItem(null);
    setShowReviewModal(false);
  };

  // Post chat message in group conversation
  const handlePostMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const newMessage = {
      id: `msg-${Date.now()}`,
      senderId: 'user',
      senderName: 'You',
      senderAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
      text: chatInput.trim(),
      time: 'Just now'
    };

    setChatMessages(prev => [...prev, newMessage]);
    setChatInput('');
  };

  // Calculate bill splits
  const totalCost = useMemo(() => {
    return itinerary.reduce((sum, item) => sum + (item.price || 0), 0);
  }, [itinerary]);

  const payerCount = collaborators.length + 1; // Collaborators + current user
  const equalPortion = totalCost / (payerCount || 1);

  return (
    <div className="animate-in fade-in duration-500 max-w-7xl mx-auto px-4 md:px-8 py-10 space-y-8">
      
      {/* Warm Milestone Hero banner */}
      <div className="relative bg-neutral-900 text-white rounded-3xl p-8 md:p-12 overflow-hidden shadow-md flex flex-col md:flex-row md:items-center justify-between gap-6 border border-neutral-800">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80')] bg-cover bg-center opacity-15"></div>
        
        <div className="relative z-10 space-y-2 max-w-xl">
          <span className="text-[10px] bg-champagne-gold text-neutral-900 font-bold px-3 py-1 rounded-full uppercase tracking-widest font-mono">
            Client &amp; Guest Suite
          </span>
          <h1 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-white mt-1">Savannah Mansions Gala</h1>
          <p className="text-neutral-300 text-xs md:text-sm leading-relaxed">
            Welcome back, Elena &amp; Marcus. Coordinate arrangements, nudge contributors, and tune the boutique vibe of your luxury occasion block.
          </p>
        </div>

        {/* Countdown */}
        <div className="relative z-10 bg-white/10 backdrop-blur-md border border-white/10 p-5 rounded-2xl flex items-center gap-4 text-center">
          <div>
            <p className="text-2xl md:text-3xl font-serif font-extrabold text-champagne-gold">102</p>
            <p className="text-[9px] font-bold uppercase text-neutral-300 tracking-wider">Days Left</p>
          </div>
          <div className="h-8 w-px bg-white/20"></div>
          <div>
            <p className="text-xs font-bold text-white uppercase tracking-widest block text-left">Oct 18, 2026</p>
            <p className="text-[10px] text-neutral-300 block text-left mt-0.5">Savannah Historic District</p>
          </div>
        </div>
      </div>

      {/* Control Tabs Navigation */}
      <div className="flex border-b border-neutral-200/50 pb-px">
        {[
          { id: 'itinerary', label: 'Itinerary & Feedback', icon: 'calendar_today' },
          { id: 'split', label: 'Cost sharing & Ledger', icon: 'payments' },
          { id: 'tasks', label: 'Group Tasks', icon: 'assignment_turned_in' },
          { id: 'vibe', label: 'Collaboration & Vibe', icon: 'palette' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-6 py-4 border-b-2 font-bold text-xs uppercase tracking-wider transition-all bg-transparent cursor-pointer ${
              activeTab === tab.id
                ? 'border-champagne-gold text-neutral-900 font-extrabold'
                : 'border-transparent text-neutral-500 hover:text-neutral-900'
            }`}
          >
            <span className="material-symbols-outlined text-base select-none">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* PORTAL TAB CONTENT */}

      {/* TAB 1: ITINERARY & COMPANION FEEDBACK */}
      {activeTab === 'itinerary' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Itinerary schedule */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex justify-between items-center bg-white border border-neutral-100 p-5 rounded-2xl shadow-xs">
              <div>
                <h3 className="font-serif text-lg font-bold text-neutral-900">Interactive Timeline</h3>
                <p className="text-neutral-500 text-xs mt-0.5">Your bespoke occasion blocks. Share reviews or inquire about itinerary details.</p>
              </div>
              <span className="text-[10px] bg-neutral-100 text-neutral-600 font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                {itinerary.length} Schedule Items
              </span>
            </div>

            {itinerary.length === 0 ? (
              <div className="bg-white border border-neutral-200/50 p-12 text-center rounded-3xl text-neutral-400">
                <span className="material-symbols-outlined text-4xl block mb-2 text-neutral-300">receipt_long</span>
                <p className="text-xs font-semibold">Itinerary is currently empty</p>
                <p className="text-[10px] text-neutral-400 max-w-xs mx-auto mt-1">Visit our Spaces, Vendors, or Food directories to schedule beautiful curated blocks.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {itinerary.map((event, index) => (
                  <div key={event.id} className="bg-white border border-neutral-200/40 rounded-2xl p-5 hover:shadow-xs transition-all flex flex-col sm:flex-row gap-5 justify-between">
                    <div className="flex gap-4">
                      {/* Timeline dot numbering */}
                      <div className="w-9 h-9 rounded-full bg-neutral-100 flex items-center justify-center font-bold text-xs text-neutral-500 shrink-0 font-mono">
                        {index + 1}
                      </div>

                      <div className="space-y-1">
                        <span className="bg-neutral-100 text-neutral-600 font-bold text-[8px] px-2 py-0.5 rounded uppercase tracking-wider">
                          {event.category}
                        </span>
                        <h4 className="font-serif text-base font-bold text-neutral-900">{event.title}</h4>
                        <p className="text-neutral-500 text-xs">📍 {event.location}</p>
                        
                        <div className="flex items-center gap-3 text-[10px] text-neutral-400 font-medium pt-1">
                          <span className="flex items-center gap-1">📅 {event.date || 'Oct 19, 2026'}</span>
                          <span>•</span>
                          <span className="flex items-center gap-1">⏰ {event.time || 'All-Day'}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col justify-between items-end gap-3 self-end sm:self-auto">
                      <span className="font-serif font-bold text-neutral-900 text-sm">${event.price?.toLocaleString() || '0'}</span>
                      
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setSelectedReviewItem({ id: event.id, title: event.title });
                            setShowReviewModal(true);
                          }}
                          className="px-3.5 py-1.5 bg-neutral-100 hover:bg-neutral-200/70 text-neutral-700 text-[10px] font-bold uppercase tracking-wider rounded-lg transition-all border-none cursor-pointer"
                        >
                          Leave Review
                        </button>
                        <button
                          onClick={() => {
                            showToast(`Contact inquiry sent to ${event.title}!`);
                          }}
                          className="px-3.5 py-1.5 bg-primary text-white text-[10px] font-bold uppercase tracking-wider rounded-lg hover:bg-neutral-800 transition-all border-none cursor-pointer"
                        >
                          Inquire
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick info panel */}
          <div className="space-y-6">
            <div className="bg-white border border-neutral-200/50 p-6 rounded-3xl shadow-xs space-y-4">
              <h4 className="font-serif text-base font-bold text-neutral-900 pb-2 border-b border-neutral-100 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-lg text-champagne-gold">help</span>
                Bespoke Concierge Guide
              </h4>
              <p className="text-neutral-500 text-xs leading-relaxed">
                Need bespoke adjustments or itinerary overrides? Planviry’s dedicated elite concierge team can manage custom requests, transportation arrangements, and layout adjustments 24/7.
              </p>
              <button 
                onClick={() => showToast("Concierge chat has been prioritized!")}
                className="w-full py-2.5 bg-neutral-900 text-white text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-neutral-800 transition-all border-none cursor-pointer"
              >
                Summon Concierge
              </button>
            </div>
          </div>

        </div>
      )}

      {/* TAB 2: COST SPLITTING LEDGER */}
      {activeTab === 'split' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Cost Splitting configuration */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white border border-neutral-200/60 rounded-3xl p-6 shadow-xs space-y-6">
              <div className="flex justify-between items-start border-b border-neutral-100 pb-4 gap-4 flex-col sm:flex-row">
                <div>
                  <h3 className="font-serif text-lg font-bold text-neutral-900">Dynamic Group Expense Ledger</h3>
                  <p className="text-neutral-500 text-xs mt-0.5">Select division strategy and manage split payments for travel companions.</p>
                </div>
                
                <select
                  value={splitStrategy}
                  onChange={(e) => {
                    setSplitStrategy(e.target.value);
                    showToast(`Cost split model updated to: ${e.target.value}`);
                  }}
                  className="px-3.5 py-2 bg-neutral-100 border border-neutral-200/40 rounded-xl text-xs font-bold focus:outline-none focus:ring-1 focus:ring-primary/20 text-neutral-700 cursor-pointer h-10"
                >
                  <option value="equal">Split Equally</option>
                  <option value="percentage">By Fixed Percentage</option>
                  <option value="per-item">By Scheduled Items</option>
                </select>
              </div>

              {/* Total Summary */}
              <div className="p-6 bg-neutral-50 rounded-2xl border border-neutral-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider">Total Itinerary Ledger</span>
                  <p className="font-serif text-3xl font-bold text-neutral-900">${totalCost.toLocaleString()}</p>
                </div>
                <div className="text-left sm:text-right">
                  <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider block">Your share Portion ({splitStrategy === 'equal' ? `1/${payerCount}` : 'Custom'})</span>
                  <p className="font-serif text-2xl font-bold text-champagne-gold">${splitStrategy === 'equal' ? equalPortion.toLocaleString(undefined, { maximumFractionDigits: 0 }) : (totalCost * 0.4).toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
                </div>
                <div>
                  {personalPaymentCompleted ? (
                    <span className="bg-emerald-50 text-emerald-700 text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-1.5 border border-emerald-100">
                      <span className="material-symbols-outlined text-sm">check_circle</span> Settled
                    </span>
                  ) : (
                    <button
                      onClick={handleSettlePersonalBill}
                      className="px-4.5 py-2.5 bg-primary text-white text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-neutral-800 transition-all border-none cursor-pointer"
                    >
                      Settle Portion
                    </button>
                  )}
                </div>
              </div>

              {/* Companion list with nudge buttons */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-widest text-neutral-400">Collaborator Contributions</h4>
                
                {collaborators.map((col) => {
                  const hasSentPayment = paymentSentStates[col.id] || false;
                  const shareAmount = splitStrategy === 'equal' ? equalPortion : totalCost * (col.role === 'Co-Host' ? 0.3 : 0.15);

                  return (
                    <div key={col.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-neutral-100 rounded-2xl gap-4 hover:shadow-xs transition-all bg-white">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full overflow-hidden border border-neutral-200">
                          <img src={col.avatar} alt={col.name} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <p className="font-bold text-neutral-900 text-xs">{col.name}</p>
                          <p className="text-[10px] text-neutral-400">{col.email}</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between sm:justify-start gap-6 self-stretch sm:self-auto">
                        <div className="text-left sm:text-right">
                          <span className="text-[9px] text-neutral-400 uppercase font-bold block">Assigned Share</span>
                          <span className="font-serif font-bold text-neutral-900 text-sm">${shareAmount.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                        </div>

                        <div>
                          {hasSentPayment ? (
                            <span className="bg-neutral-100 text-neutral-500 text-[10px] font-bold px-3 py-1.5 rounded-lg flex items-center gap-1">
                              <span className="material-symbols-outlined text-xs">hourglass_empty</span> Pending Receipt
                            </span>
                          ) : (
                            <button
                              onClick={() => {
                                handleSendPaymentRequest(col.id);
                                showToast(`Payment nudge dispatched to ${col.name}!`);
                              }}
                              className="px-3.5 py-1.5 bg-neutral-900 text-white text-[10px] font-bold uppercase tracking-wider rounded-lg hover:bg-neutral-800 transition-all border-none cursor-pointer"
                            >
                              Nudge Partner
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Quick payment secure summary card */}
          <div className="space-y-6">
            <div className="bg-white border border-neutral-200/50 p-6 rounded-3xl shadow-xs space-y-4">
              <div className="flex items-center gap-2 text-[#635BFF] pb-2 border-b border-neutral-100">
                <span className="material-symbols-outlined text-2xl select-none">security</span>
                <span className="font-bold text-xs uppercase tracking-widest text-[#635BFF]">Secure Escrow Split</span>
              </div>
              <p className="text-neutral-500 text-xs leading-relaxed">
                All guest splits are held in a secure, interest-bearing Stripe escrow. Funds are routed directly to certified vendors only upon successful service completion check.
              </p>
              <div className="p-3 bg-neutral-50 rounded-xl flex items-center justify-between text-[10px] text-neutral-500 font-bold uppercase">
                <span>Stripe connect Gateway</span>
                <span className="text-emerald-600">Active secure</span>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* TAB 3: GROUP TASK BOARD */}
      {activeTab === 'tasks' && (
        <div className="bg-white border border-neutral-200/60 rounded-3xl p-6 shadow-xs space-y-6">
          <div className="flex justify-between items-center border-b border-neutral-100 pb-4">
            <div>
              <h3 className="font-serif text-lg font-bold text-neutral-900">Co-Planning Tasks</h3>
              <p className="text-neutral-500 text-xs mt-0.5">Keep track of arrangements, coordinate with companions, and check off milestones.</p>
            </div>
            
            <button
              onClick={() => showToast("Manage tasks in detail from the Tasks menu!")}
              className="px-4.5 py-2.5 bg-primary text-white font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-neutral-800 transition-all border-none cursor-pointer"
            >
              Configure Board
            </button>
          </div>

          {/* Tasks Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {tasks.map((task) => {
              const assignee = collaborators.find(c => c.id === task.assigneeId);
              
              return (
                <div 
                  key={task.id} 
                  className={`border rounded-2xl p-5 flex flex-col justify-between gap-4 transition-all hover:shadow-xs bg-neutral-50/20 ${
                    task.completed ? 'border-neutral-200/50 opacity-60' : 'border-neutral-100 bg-white'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex justify-between items-start gap-2">
                      <span className="bg-neutral-100 text-neutral-600 font-bold text-[8px] px-2.5 py-1 rounded uppercase tracking-wider">
                        {task.category}
                      </span>
                      <span className={`text-[8px] font-extrabold uppercase px-2 py-0.5 rounded tracking-wider ${
                        task.priority === 'High' ? 'bg-rose-50 text-rose-700 border border-rose-100' :
                        task.priority === 'Medium' ? 'bg-amber-50 text-amber-700 border border-amber-100' :
                        'bg-neutral-100 text-neutral-600'
                      }`}>
                        {task.priority} Priority
                      </span>
                    </div>

                    <h4 className={`font-serif text-sm font-bold text-neutral-900 leading-snug ${task.completed ? 'line-through' : ''}`}>
                      {task.title}
                    </h4>
                    {task.description && (
                      <p className="text-neutral-500 text-xs leading-relaxed line-clamp-2">{task.description}</p>
                    )}
                  </div>

                  <div className="flex items-center justify-between border-t border-neutral-100/50 pt-3">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full overflow-hidden border border-neutral-200 shrink-0">
                        <img src={assignee?.avatar || IMAGES.elena} alt={assignee?.name || ' Elena'} className="w-full h-full object-cover" />
                      </div>
                      <span className="text-[10px] text-neutral-500 font-semibold">{assignee?.name || ' Elena'}</span>
                    </div>

                    <button
                      onClick={() => {
                        handleToggleTask(task.id);
                        showToast(`Task marked as ${!task.completed ? 'completed' : 'incomplete'}`);
                      }}
                      className={`flex items-center gap-1 px-3 py-1.5 rounded-lg font-bold text-[9px] uppercase tracking-wider transition-all border-none cursor-pointer ${
                        task.completed 
                          ? 'bg-emerald-50 text-emerald-700' 
                          : 'bg-neutral-100 hover:bg-neutral-200/70 text-neutral-700'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[11px] font-bold select-none">
                        {task.completed ? 'check_box' : 'check_box_outline_blank'}
                      </span>
                      {task.completed ? 'Done' : 'Mark Done'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 4: BLUEPRINT COLLABORATION & VIBE CHECK */}
      {activeTab === 'vibe' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Vibe customization sliders */}
          <div className="lg:col-span-2 bg-white border border-neutral-200/60 rounded-3xl p-6 shadow-xs space-y-6">
            <div className="border-b border-neutral-100 pb-4">
              <h3 className="font-serif text-lg font-bold text-neutral-900">Platform Blueprint Vibe</h3>
              <p className="text-neutral-500 text-xs mt-0.5">Tune the core visual descriptors and mood sliders to adjust curation aesthetics.</p>
            </div>

            {/* Sliders */}
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-bold text-neutral-700 uppercase">
                  <span>Intimacy Level (Micro vs Grand Gala)</span>
                  <span className="text-primary font-mono">{vibeIntimacy}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={vibeIntimacy}
                  onChange={(e) => setVibeIntimacy(parseInt(e.target.value))}
                  className="w-full accent-primary bg-neutral-100 h-1.5 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-bold text-neutral-700 uppercase">
                  <span>Opulence &amp; Luxury Grade</span>
                  <span className="text-primary font-mono">{vibeOpulence}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={vibeOpulence}
                  onChange={(e) => setVibeOpulence(parseInt(e.target.value))}
                  className="w-full accent-primary bg-neutral-100 h-1.5 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-bold text-neutral-700 uppercase">
                  <span>Activity &amp; Pace</span>
                  <span className="text-primary font-mono">{vibeActivity}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={vibeActivity}
                  onChange={(e) => setVibeActivity(parseInt(e.target.value))}
                  className="w-full accent-primary bg-neutral-100 h-1.5 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>

            {/* Theme Presets */}
            <div className="pt-4 border-t border-neutral-100 space-y-3">
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Curated Vibe Templates</h4>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: 'savannah', label: 'Savannah Estate', desc: 'Southern moss & brick' },
                  { id: 'napa', label: 'Napa Vineyard', desc: 'Rustic luxury garden' },
                  { id: 'como', label: 'Lake Como Villa', desc: 'Classic European water' }
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => {
                      setSelectedBlueprintTheme(t.id as any);
                      if (t.id === 'savannah') { setVibeIntimacy(40); setVibeOpulence(85); setVibeActivity(30); }
                      if (t.id === 'napa') { setVibeIntimacy(75); setVibeOpulence(70); setVibeActivity(40); }
                      if (t.id === 'como') { setVibeIntimacy(55); setVibeOpulence(95); setVibeActivity(50); }
                      showToast(`Vibe theme set to ${t.label}!`);
                    }}
                    className={`p-3.5 border rounded-xl text-left transition-all cursor-pointer ${
                      selectedBlueprintTheme === t.id
                        ? 'border-champagne-gold bg-neutral-50 shadow-xs'
                        : 'border-neutral-150 hover:border-neutral-300 bg-transparent'
                    }`}
                  >
                    <p className="font-bold text-neutral-900 text-xs">{t.label}</p>
                    <p className="text-[9px] text-neutral-400 mt-0.5">{t.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Group Chat Thread */}
          <div className="bg-white border border-neutral-200/60 rounded-3xl p-6 shadow-xs flex flex-col h-[480px] justify-between">
            <h3 className="font-serif text-base font-bold text-neutral-900 pb-3 border-b border-neutral-100 flex items-center gap-2 shrink-0">
              <span className="material-symbols-outlined text-lg text-neutral-400">forum</span>
              Guest Discussion Board
            </h3>

            {/* Message streams */}
            <div className="flex-grow overflow-y-auto py-4 space-y-3 pr-1 hide-scrollbar">
              {chatMessages.map((msg) => (
                <div key={msg.id} className={`flex gap-2 text-xs ${msg.senderId === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className="w-7 h-7 rounded-full overflow-hidden shrink-0 border border-neutral-100">
                    <img src={msg.senderAvatar} alt={msg.senderName} className="w-full h-full object-cover" />
                  </div>
                  <div className={`p-3 rounded-2xl max-w-[80%] ${
                    msg.senderId === 'user' 
                      ? 'bg-neutral-900 text-white rounded-tr-none' 
                      : 'bg-neutral-100 text-neutral-800 rounded-tl-none'
                  }`}>
                    <p className="font-extrabold text-[9px] mb-0.5 text-champagne-gold">{msg.senderName}</p>
                    <p className="leading-normal">{msg.text}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Message sender input */}
            <form onSubmit={handlePostMessage} className="flex gap-2 border-t border-neutral-100 pt-3 shrink-0">
              <input
                type="text"
                placeholder="Reply to companions..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                className="flex-grow px-3.5 py-2 border border-neutral-200 focus:border-primary focus:outline-none focus:ring-0 text-xs text-neutral-800 rounded-xl bg-neutral-50"
              />
              <button 
                type="submit"
                className="px-4.5 bg-primary hover:bg-neutral-800 text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-all border-none cursor-pointer flex items-center justify-center"
              >
                Post
              </button>
            </form>
          </div>

        </div>
      )}

      {/* INTERACTIVE REVIEW FEEDBACK MODAL */}
      {showReviewModal && selectedReviewItem && (
        <div className="fixed inset-0 bg-neutral-900/40 z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-neutral-200/50 p-6 space-y-4">
            <div className="flex justify-between items-center border-b border-neutral-100 pb-3">
              <h3 className="font-serif text-lg font-bold text-neutral-900">Partner Evaluation</h3>
              <button 
                onClick={() => {
                  setSelectedReviewItem(null);
                  setShowReviewModal(false);
                }}
                className="p-1.5 hover:bg-neutral-100 rounded-full border-none cursor-pointer bg-transparent"
              >
                <span className="material-symbols-outlined text-neutral-500 text-lg select-none">close</span>
              </button>
            </div>

            <form onSubmit={handleSubmitReview} className="space-y-4">
              <div>
                <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider block mb-1">Evaluating listing</span>
                <p className="font-serif text-base font-bold text-neutral-900">{selectedReviewItem.title}</p>
              </div>

              {/* Rating Star Selection */}
              <div className="space-y-1.5">
                <label className="text-[9px] font-bold uppercase tracking-widest text-neutral-400 block">Quality Assessment Rating</label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setUserRating(star)}
                      className="p-1 text-2xl transition-all border-none cursor-pointer bg-transparent"
                    >
                      <span 
                        className="material-symbols-outlined select-none text-2xl"
                        style={{ 
                          color: star <= userRating ? '#D4AF37' : '#D1D5DB',
                          fontVariationSettings: star <= userRating ? "'FILL' 1" : "'FILL' 0"
                        }}
                      >
                        star
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Comments */}
              <div className="space-y-1.5">
                <label className="text-[9px] font-bold uppercase tracking-widest text-neutral-400 block">Comments &amp; Experience Notes</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Tell your travel companion and platform admins what you liked about this bento curation service..."
                  value={userComment}
                  onChange={(e) => setUserComment(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 focus:border-primary focus:outline-none focus:ring-0 text-xs text-neutral-800 resize-none"
                />
              </div>

              <div className="flex gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedReviewItem(null);
                    setShowReviewModal(false);
                  }}
                  className="w-1/2 py-2.5 bg-neutral-100 hover:bg-neutral-200/70 text-neutral-700 text-xs font-bold uppercase tracking-wider rounded-xl transition-all border-none cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2.5 bg-primary text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-neutral-800 transition-all border-none cursor-pointer"
                >
                  Post Evaluation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
