export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      civic_complaints: {
        Row: {
          action_taken: string | null
          category: Database["public"]["Enums"]["complaint_category"]
          comments_count: number | null
          created_at: string | null
          description: string
          estimated_resolution: string | null
          id: string
          image_url: string | null
          location: string
          priority: Database["public"]["Enums"]["complaint_priority"]
          reported_by: string
          status: Database["public"]["Enums"]["complaint_status"] | null
          title: string
          updated_at: string | null
          upvotes: number | null
        }
        Insert: {
          action_taken?: string | null
          category: Database["public"]["Enums"]["complaint_category"]
          comments_count?: number | null
          created_at?: string | null
          description: string
          estimated_resolution?: string | null
          id?: string
          image_url?: string | null
          location: string
          priority: Database["public"]["Enums"]["complaint_priority"]
          reported_by: string
          status?: Database["public"]["Enums"]["complaint_status"] | null
          title: string
          updated_at?: string | null
          upvotes?: number | null
        }
        Update: {
          action_taken?: string | null
          category?: Database["public"]["Enums"]["complaint_category"]
          comments_count?: number | null
          created_at?: string | null
          description?: string
          estimated_resolution?: string | null
          id?: string
          image_url?: string | null
          location?: string
          priority?: Database["public"]["Enums"]["complaint_priority"]
          reported_by?: string
          status?: Database["public"]["Enums"]["complaint_status"] | null
          title?: string
          updated_at?: string | null
          upvotes?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "civic_complaints_reported_by_fkey"
            columns: ["reported_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      complaint_comments: {
        Row: {
          comment: string
          complaint_id: string
          created_at: string | null
          id: string
          user_id: string
        }
        Insert: {
          comment: string
          complaint_id: string
          created_at?: string | null
          id?: string
          user_id: string
        }
        Update: {
          comment?: string
          complaint_id?: string
          created_at?: string | null
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "complaint_comments_complaint_id_fkey"
            columns: ["complaint_id"]
            isOneToOne: false
            referencedRelation: "civic_complaints"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "complaint_comments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      complaint_upvotes: {
        Row: {
          complaint_id: string
          created_at: string | null
          id: string
          user_id: string
        }
        Insert: {
          complaint_id: string
          created_at?: string | null
          id?: string
          user_id: string
        }
        Update: {
          complaint_id?: string
          created_at?: string | null
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "complaint_upvotes_complaint_id_fkey"
            columns: ["complaint_id"]
            isOneToOne: false
            referencedRelation: "civic_complaints"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "complaint_upvotes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      hotspot_upvotes: {
        Row: {
          created_at: string | null
          hotspot_id: string
          id: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          hotspot_id: string
          id?: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          hotspot_id?: string
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "hotspot_upvotes_hotspot_id_fkey"
            columns: ["hotspot_id"]
            isOneToOne: false
            referencedRelation: "hotspots"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "hotspot_upvotes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      hotspots: {
        Row: {
          action_taken: string | null
          category: Database["public"]["Enums"]["complaint_category"]
          created_at: string | null
          description: string
          dust_collected_kg: number | null
          estimated_resolution: string | null
          id: string
          image_url: string | null
          latitude: number
          location: string
          longitude: number
          priority: Database["public"]["Enums"]["hotspot_priority"]
          reported_by: string
          reports_count: number | null
          status: Database["public"]["Enums"]["hotspot_status"] | null
          updated_at: string | null
          upvotes: number | null
          verified_by: string | null
        }
        Insert: {
          action_taken?: string | null
          category: Database["public"]["Enums"]["complaint_category"]
          created_at?: string | null
          description: string
          dust_collected_kg?: number | null
          estimated_resolution?: string | null
          id?: string
          image_url?: string | null
          latitude: number
          location: string
          longitude: number
          priority: Database["public"]["Enums"]["hotspot_priority"]
          reported_by: string
          reports_count?: number | null
          status?: Database["public"]["Enums"]["hotspot_status"] | null
          updated_at?: string | null
          upvotes?: number | null
          verified_by?: string | null
        }
        Update: {
          action_taken?: string | null
          category?: Database["public"]["Enums"]["complaint_category"]
          created_at?: string | null
          description?: string
          dust_collected_kg?: number | null
          estimated_resolution?: string | null
          id?: string
          image_url?: string | null
          latitude?: number
          location?: string
          longitude?: number
          priority?: Database["public"]["Enums"]["hotspot_priority"]
          reported_by?: string
          reports_count?: number | null
          status?: Database["public"]["Enums"]["hotspot_status"] | null
          updated_at?: string | null
          upvotes?: number | null
          verified_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "hotspots_reported_by_fkey"
            columns: ["reported_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "hotspots_verified_by_fkey"
            columns: ["verified_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      newsletter_subscriptions: {
        Row: {
          active: boolean | null
          email: string
          id: string
          name: string | null
          subscribed_at: string | null
        }
        Insert: {
          active?: boolean | null
          email: string
          id?: string
          name?: string | null
          subscribed_at?: string | null
        }
        Update: {
          active?: boolean | null
          email?: string
          id?: string
          name?: string | null
          subscribed_at?: string | null
        }
        Relationships: []
      }
      order_items: {
        Row: {
          created_at: string | null
          id: string
          order_id: string
          product_id: string
          quantity: number
          unit_price: number
        }
        Insert: {
          created_at?: string | null
          id?: string
          order_id: string
          product_id: string
          quantity: number
          unit_price: number
        }
        Update: {
          created_at?: string | null
          id?: string
          order_id?: string
          product_id?: string
          quantity?: number
          unit_price?: number
        }
        Relationships: [
          {
            foreignKeyName: "order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          created_at: string | null
          id: string
          notes: string | null
          shipping_address: Json
          status: Database["public"]["Enums"]["order_status"] | null
          total_amount: number
          tracking_number: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          notes?: string | null
          shipping_address: Json
          status?: Database["public"]["Enums"]["order_status"] | null
          total_amount: number
          tracking_number?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          notes?: string | null
          shipping_address?: Json
          status?: Database["public"]["Enums"]["order_status"] | null
          total_amount?: number
          tracking_number?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "orders_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      products: {
        Row: {
          application: string | null
          badges: string[] | null
          category: Database["public"]["Enums"]["product_category"]
          coverage: string | null
          created_at: string | null
          description: string
          id: string
          image_url: string | null
          impact_story: string | null
          in_stock: boolean | null
          name: string
          price: number
          rating: number | null
          reviews_count: number | null
          specifications: string | null
          stock_quantity: number | null
          updated_at: string | null
        }
        Insert: {
          application?: string | null
          badges?: string[] | null
          category: Database["public"]["Enums"]["product_category"]
          coverage?: string | null
          created_at?: string | null
          description: string
          id?: string
          image_url?: string | null
          impact_story?: string | null
          in_stock?: boolean | null
          name: string
          price: number
          rating?: number | null
          reviews_count?: number | null
          specifications?: string | null
          stock_quantity?: number | null
          updated_at?: string | null
        }
        Update: {
          application?: string | null
          badges?: string[] | null
          category?: Database["public"]["Enums"]["product_category"]
          coverage?: string | null
          created_at?: string | null
          description?: string
          id?: string
          image_url?: string | null
          impact_story?: string | null
          in_stock?: boolean | null
          name?: string
          price?: number
          rating?: number | null
          reviews_count?: number | null
          specifications?: string | null
          stock_quantity?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string | null
          display_name: string | null
          dust_collected_kg: number | null
          eco_points: number | null
          id: string
          location: string | null
          phone: string | null
          role: Database["public"]["Enums"]["user_role"] | null
          total_cleanups: number | null
          total_reports: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          display_name?: string | null
          dust_collected_kg?: number | null
          eco_points?: number | null
          id?: string
          location?: string | null
          phone?: string | null
          role?: Database["public"]["Enums"]["user_role"] | null
          total_cleanups?: number | null
          total_reports?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          display_name?: string | null
          dust_collected_kg?: number | null
          eco_points?: number | null
          id?: string
          location?: string | null
          phone?: string | null
          role?: Database["public"]["Enums"]["user_role"] | null
          total_cleanups?: number | null
          total_reports?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_favorites: {
        Row: {
          created_at: string | null
          id: string
          product_id: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          product_id: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          product_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_favorites_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_favorites_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_user_role: {
        Args: { _user_id: string }
        Returns: Database["public"]["Enums"]["user_role"]
      }
    }
    Enums: {
      complaint_category: "dust" | "noise" | "waste" | "air" | "water"
      complaint_priority: "high" | "medium" | "low"
      complaint_status: "received" | "in-review" | "action-taken" | "resolved"
      hotspot_priority: "high" | "medium" | "low"
      hotspot_status: "reported" | "verified" | "cleaning" | "completed"
      order_status:
        | "pending"
        | "confirmed"
        | "processing"
        | "shipped"
        | "delivered"
        | "cancelled"
      product_category: "frame" | "applicant" | "kit" | "paint"
      user_role: "admin" | "moderator" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      complaint_category: ["dust", "noise", "waste", "air", "water"],
      complaint_priority: ["high", "medium", "low"],
      complaint_status: ["received", "in-review", "action-taken", "resolved"],
      hotspot_priority: ["high", "medium", "low"],
      hotspot_status: ["reported", "verified", "cleaning", "completed"],
      order_status: [
        "pending",
        "confirmed",
        "processing",
        "shipped",
        "delivered",
        "cancelled",
      ],
      product_category: ["frame", "applicant", "kit", "paint"],
      user_role: ["admin", "moderator", "user"],
    },
  },
} as const
