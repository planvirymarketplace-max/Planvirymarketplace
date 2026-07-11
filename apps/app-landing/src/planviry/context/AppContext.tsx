import React, { createContext, useContext, useState } from 'react';
import {
  CartItem,
  Task,
  ItineraryEvent,
  Collaborator,
  ChatMessage,
  ActivityLog,
  BookingRequest,
  CategoryLens
} from '../types';
import {
  INITIAL_TASKS,
  INITIAL_ITINERARY,
  INITIAL_COLLABORATORS,
  INITIAL_MESSAGES,
  INITIAL_ACTIVITIES,
  INITIAL_BOOKING_REQUESTS
} from '../data';

interface AppContextProps {
  // Navigation & Category states
  activeCategory: CategoryLens;
  setActiveCategory: (cat: CategoryLens) => void;

  selectedItem: CartItem | null;
  setSelectedItem: (item: CartItem | null) => void;

  // Search & Filter state
  searchWhat: string;
  setSearchWhat: (val: string) => void;
  searchWhere: string;
  setSearchWhere: (val: string) => void;
  searchWhen: string;
  setSearchWhen: (val: string) => void;
  searchPrice: string;
  setSearchPrice: (val: string) => void;
  searchAttendees: string;
  setSearchAttendees: (val: string) => void;
  searchBudget: string;
  setSearchBudget: (val: string) => void;
  searchFilters: string;
  setSearchFilters: (val: string) => void;
  selectedSubcategory: string;
  setSelectedSubcategory: (val: string) => void;

  // Tasks state
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  newTaskTitle: string;
  setNewTaskTitle: (val: string) => void;
  newTaskAssignee: string;
  setNewTaskAssignee: (val: string) => void;
  newTaskCategory: string;
  setNewTaskCategory: (val: string) => void;
  newTaskPriority: 'Low' | 'Medium' | 'High';
  setNewTaskPriority: (val: 'Low' | 'Medium' | 'High') => void;
  newTaskDueDate: string;
  setNewTaskDueDate: (val: string) => void;
  newTaskDescription: string;
  setNewTaskDescription: (val: string) => void;
  isAddTaskOpen: boolean;
  setIsAddTaskOpen: (open: boolean) => void;
  taskFilterAssignee: string;
  setTaskFilterAssignee: (val: string) => void;
  taskFilterStatus: string;
  setTaskFilterStatus: (val: string) => void;

  // Handlers for Tasks
  handleToggleTask: (id: string) => void;
  handleCreateTask: (e: React.FormEvent) => void;
  handleDeleteTask: (id: string) => void;

  // Concierge Itinerary & Collaborators state
  itinerary: ItineraryEvent[];
  setItinerary: React.Dispatch<React.SetStateAction<ItineraryEvent[]>>;
  collaborators: Collaborator[];
  setCollaborators: React.Dispatch<React.SetStateAction<Collaborator[]>>;
  chatMessages: ChatMessage[];
  setChatMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
  activities: ActivityLog[];
  setActivities: React.Dispatch<React.SetStateAction<ActivityLog[]>>;
  chatInput: string;
  setChatInput: (val: string) => void;
  isChatOpen: boolean;
  setIsCartChatOpen: (open: boolean) => void;
  showShareModal: boolean;
  setShowShareModal: (show: boolean) => void;
  shareEmail: string;
  setShareEmail: (val: string) => void;

  // Split Strategy Payment states
  splitStrategy: string;
  setSplitStrategy: (val: string) => void;
  paymentSentStates: Record<string, boolean>;
  setPaymentSentStates: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  personalPaymentCompleted: boolean;
  setPersonalPaymentCompleted: (val: boolean) => void;
  handleSendPaymentRequest: (memberId: string) => void;

  // Booking Requests (Vendor portal)
  bookingRequests: BookingRequest[];
  setBookingRequests: React.Dispatch<React.SetStateAction<BookingRequest[]>>;
  vendorInput: string;
  setVendorInput: (val: string) => void;
  handleUpdateBookingStatus: (id: string, status: 'Approved' | 'Declined') => void;

  // Blueprint Vibe states
  vibeIntimacy: number;
  setVibeIntimacy: (val: number) => void;
  vibeOpulence: number;
  setVibeOpulence: (val: number) => void;
  vibeActivity: number;
  setVibeActivity: (val: number) => void;
  selectedBlueprintTheme: 'savannah' | 'napa' | 'como';
  setSelectedBlueprintTheme: (val: 'savannah' | 'napa' | 'como') => void;
  showBlueprintSuccessDrawer: boolean;
  setShowBlueprintSuccessDrawer: (show: boolean) => void;

  // Toast notification
  toastMessage: string | null;
  setToastMessage: (msg: string | null) => void;
  showToast: (msg: string) => void;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeCategory, setActiveCategory] = useState<CategoryLens>('vendors');
  const [selectedItem, setSelectedItem] = useState<CartItem | null>(null);

  // Search & Filters
  const [searchWhat, setSearchWhat] = useState<string>('');
  const [searchWhere, setSearchWhere] = useState<string>('');
  const [searchWhen, setSearchWhen] = useState<string>('Oct 18 - Oct 20');
  const [searchPrice, setSearchPrice] = useState<string>('all');
  const [searchAttendees, setSearchAttendees] = useState<string>('4 Guests');
  const [searchBudget, setSearchBudget] = useState<string>('Any Budget');
  const [searchFilters, setSearchFilters] = useState<string>('all');
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('all');

  // Tasks
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [newTaskTitle, setNewTaskTitle] = useState<string>('');
  const [newTaskAssignee, setNewTaskAssignee] = useState<string>('col-4');
  const [newTaskCategory, setNewTaskCategory] = useState<string>('Catering Liaison');
  const [newTaskPriority, setNewTaskPriority] = useState<'Low' | 'Medium' | 'High'>('Medium');
  const [newTaskDueDate, setNewTaskDueDate] = useState<string>('Friday, Oct 18');
  const [newTaskDescription, setNewTaskDescription] = useState<string>('');
  const [isAddTaskOpen, setIsAddTaskOpen] = useState<boolean>(false);
  const [taskFilterAssignee, setTaskFilterAssignee] = useState<string>('all');
  const [taskFilterStatus, setTaskFilterStatus] = useState<string>('all');

  // Concierge Itinerary & Collaborators
  const [itinerary, setItinerary] = useState<ItineraryEvent[]>(INITIAL_ITINERARY);
  const [collaborators, setCollaborators] = useState<Collaborator[]>(INITIAL_COLLABORATORS);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [activities, setActivities] = useState<ActivityLog[]>(INITIAL_ACTIVITIES);
  const [chatInput, setChatInput] = useState<string>('');
  const [isChatOpen, setIsCartChatOpen] = useState<boolean>(true);
  const [showShareModal, setShowShareModal] = useState<boolean>(false);
  const [shareEmail, setShareEmail] = useState<string>('');

  // Payment states
  const [splitStrategy, setSplitStrategy] = useState<string>('equal');
  const [paymentSentStates, setPaymentSentStates] = useState<Record<string, boolean>>({});
  const [personalPaymentCompleted, setPersonalPaymentCompleted] = useState<boolean>(false);

  // Vendor Portal
  const [bookingRequests, setBookingRequests] = useState<BookingRequest[]>(INITIAL_BOOKING_REQUESTS);
  const [vendorInput, setVendorInput] = useState<string>('');

  // Blueprint Vibe sliders
  const [vibeIntimacy, setVibeIntimacy] = useState<number>(50);
  const [vibeOpulence, setVibeOpulence] = useState<number>(50);
  const [vibeActivity, setVibeActivity] = useState<number>(50);
  const [selectedBlueprintTheme, setSelectedBlueprintTheme] = useState<'savannah' | 'napa' | 'como'>('savannah');
  const [showBlueprintSuccessDrawer, setShowBlueprintSuccessDrawer] = useState<boolean>(false);

  // Toast notification state
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
  };

  // Task Handlers
  const handleToggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          const updatedState = !t.completed;
          const assigneeName = collaborators.find((col) => col.id === t.assigneeId)?.name || 'Someone';
          
          const newAct: ActivityLog = {
            id: `act-${Date.now()}`,
            user: 'You',
            action: `${updatedState ? 'completed' : 'reopened'} task "${t.title}" (assigned to ${assigneeName})`,
            time: 'Just now',
            icon: updatedState ? 'check_circle' : 'pending',
          };
          setActivities((act) => [newAct, ...act]);
          return { ...t, completed: updatedState };
        }
        return t;
      })
    );
  };

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    const newTask: Task = {
      id: `task-${Date.now()}`,
      title: newTaskTitle.trim(),
      assigneeId: newTaskAssignee,
      category: newTaskCategory,
      dueDate: newTaskDueDate,
      priority: newTaskPriority,
      completed: false,
      description: newTaskDescription.trim() || undefined,
    };

    setTasks((prev) => [newTask, ...prev]);

    const assigneeName = collaborators.find((col) => col.id === newTaskAssignee)?.name || 'Someone';
    const newAct: ActivityLog = {
      id: `act-${Date.now()}`,
      user: 'You',
      action: `assigned a new task: "${newTask.title}" to ${assigneeName}`,
      time: 'Just now',
      icon: 'playlist_add',
    };
    setActivities((act) => [newAct, ...act]);

    setNewTaskTitle('');
    setNewTaskDescription('');
    setIsAddTaskOpen(false);
  };

  const handleDeleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  // Vendor Portal Handlers
  const handleUpdateBookingStatus = (id: string, status: 'Approved' | 'Declined') => {
    setBookingRequests((prev) =>
      prev.map((req) => (req.id === id ? { ...req, status } : req))
    );
  };

  // Payment Handlers
  const handleSendPaymentRequest = (memberId: string) => {
    setPaymentSentStates((prev) => ({ ...prev, [memberId]: true }));
  };

  return (
    <AppContext.Provider
      value={{
        activeCategory,
        setActiveCategory,
        selectedItem,
        setSelectedItem,
        searchWhat,
        setSearchWhat,
        searchWhere,
        setSearchWhere,
        searchWhen,
        setSearchWhen,
        searchPrice,
        setSearchPrice,
        searchAttendees,
        setSearchAttendees,
        searchBudget,
        setSearchBudget,
        searchFilters,
        setSearchFilters,
        selectedSubcategory,
        setSelectedSubcategory,
        tasks,
        setTasks,
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
        taskFilterAssignee,
        setTaskFilterAssignee,
        taskFilterStatus,
        setTaskFilterStatus,
        handleToggleTask,
        handleCreateTask,
        handleDeleteTask,
        itinerary,
        setItinerary,
        collaborators,
        setCollaborators,
        chatMessages,
        setChatMessages,
        activities,
        setActivities,
        chatInput,
        setChatInput,
        isChatOpen,
        setIsCartChatOpen,
        showShareModal,
        setShowShareModal,
        shareEmail,
        setShareEmail,
        splitStrategy,
        setSplitStrategy,
        paymentSentStates,
        setPaymentSentStates,
        personalPaymentCompleted,
        setPersonalPaymentCompleted,
        handleSendPaymentRequest,
        bookingRequests,
        setBookingRequests,
        vendorInput,
        setVendorInput,
        handleUpdateBookingStatus,
        vibeIntimacy,
        setVibeIntimacy,
        vibeOpulence,
        setVibeOpulence,
        vibeActivity,
        setVibeActivity,
        selectedBlueprintTheme,
        setSelectedBlueprintTheme,
        showBlueprintSuccessDrawer,
        setShowBlueprintSuccessDrawer,
        toastMessage,
        setToastMessage,
        showToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
