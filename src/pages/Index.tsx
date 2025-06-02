
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Camera, Plus, Receipt, TrendingUp, DollarSign, Calendar } from 'lucide-react';
import CameraCapture from '@/components/CameraCapture';
import ExpenseList from '@/components/ExpenseList';
import ExpenseStats from '@/components/ExpenseStats';

export interface Expense {
  id: string;
  amount: number;
  description: string;
  category: string;
  date: string;
  imageUrl?: string;
}

const Index = () => {
  const [showCamera, setShowCamera] = useState(false);
  const [expenses, setExpenses] = useState<Expense[]>([
    {
      id: '1',
      amount: 24.99,
      description: 'Grocery shopping at Whole Foods',
      category: 'Food & Dining',
      date: '2024-06-02',
    },
    {
      id: '2',
      amount: 12.50,
      description: 'Coffee at Starbucks',
      category: 'Food & Dining',
      date: '2024-06-01',
    },
  ]);

  const addExpense = (expense: Expense) => {
    setExpenses(prev => [expense, ...prev]);
  };

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const thisMonthExpenses = expenses.filter(expense => 
    new Date(expense.date).getMonth() === new Date().getMonth()
  ).length;

  if (showCamera) {
    return (
      <CameraCapture 
        onCapture={addExpense}
        onClose={() => setShowCamera(false)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Expense Tracker</h1>
          <p className="text-gray-600">Track your expenses with AI-powered receipt scanning</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Expenses</CardTitle>
              <DollarSign className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">${totalExpenses.toFixed(2)}</div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">This Month</CardTitle>
              <Calendar className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{thisMonthExpenses}</div>
              <p className="text-xs text-gray-600">expenses logged</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Average</CardTitle>
              <TrendingUp className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                ${expenses.length > 0 ? (totalExpenses / expenses.length).toFixed(2) : '0.00'}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mb-8">
          <Button 
            onClick={() => setShowCamera(true)}
            size="lg"
            className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white shadow-lg transform hover:scale-105 transition-all duration-200"
          >
            <Camera className="mr-2 h-5 w-5" />
            Scan Receipt
          </Button>
          
          <Button 
            variant="outline" 
            size="lg"
            className="border-2 border-gray-300 hover:border-green-500 hover:bg-green-50 transition-all duration-200"
          >
            <Plus className="mr-2 h-5 w-5" />
            Add Manual
          </Button>
        </div>

        {/* Expense Stats */}
        <ExpenseStats expenses={expenses} />

        {/* Recent Expenses */}
        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Receipt className="h-5 w-5 text-green-600" />
              Recent Expenses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ExpenseList expenses={expenses} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
