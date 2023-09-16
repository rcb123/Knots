export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      communities: {
        Row: {
          bio: string | null
          created_at: string
          created_by: string
          id: string
          image: string | null
          name: string
          username: string
        }
        Insert: {
          bio?: string | null
          created_at?: string
          created_by: string
          id?: string
          image?: string | null
          name: string
          username: string
        }
        Update: {
          bio?: string | null
          created_at?: string
          created_by?: string
          id?: string
          image?: string | null
          name?: string
          username?: string
        }
        Relationships: [
          {
            foreignKeyName: "communities_created_by_fkey"
            columns: ["created_by"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      community_membership: {
        Row: {
          community_id: string
          join_date: string
          user_id: string
        }
        Insert: {
          community_id: string
          join_date?: string
          user_id: string
        }
        Update: {
          community_id?: string
          join_date?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "community_membership_community_id_fkey"
            columns: ["community_id"]
            referencedRelation: "communities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "community_membership_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      knots: {
        Row: {
          author: string
          community: string | null
          created_at: string
          id: string
          parentId: string | null
          text: string
        }
        Insert: {
          author: string
          community?: string | null
          created_at?: string
          id?: string
          parentId?: string | null
          text: string
        }
        Update: {
          author?: string
          community?: string | null
          created_at?: string
          id?: string
          parentId?: string | null
          text?: string
        }
        Relationships: [
          {
            foreignKeyName: "knots_author_fkey"
            columns: ["author"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "knots_community_fkey"
            columns: ["community"]
            referencedRelation: "communities"
            referencedColumns: ["id"]
          }
        ]
      }
      posts: {
        Row: {
          content: string
          created_at: string
          id: string | null
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string | null
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string | null
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "posts_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      shortLink: {
        Row: {
          clicks: number
          created_at: string | null
          id: string | null
          owner: string | null
          slug: string
          updated_at: string | null
          url: string | null
          utm_campaign: string | null
          utm_medium: string | null
          utm_source: string | null
        }
        Insert: {
          clicks?: number
          created_at?: string | null
          id?: string | null
          owner?: string | null
          slug: string
          updated_at?: string | null
          url?: string | null
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
        }
        Update: {
          clicks?: number
          created_at?: string | null
          id?: string | null
          owner?: string | null
          slug?: string
          updated_at?: string | null
          url?: string | null
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
        }
        Relationships: []
      }
      users: {
        Row: {
          bio: string | null
          created_at: string
          id: string
          name: string
          profile_image: string | null
          updated_at: string
          username: string
        }
        Insert: {
          bio?: string | null
          created_at?: string
          id: string
          name: string
          profile_image?: string | null
          updated_at?: string
          username: string
        }
        Update: {
          bio?: string | null
          created_at?: string
          id?: string
          name?: string
          profile_image?: string | null
          updated_at?: string
          username?: string
        }
        Relationships: [
          {
            foreignKeyName: "users_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      delete_profile_image: {
        Args: {
          avatar_url: string
        }
        Returns: Record<string, unknown>
      }
      delete_storage_object: {
        Args: {
          bucket: string
          object: string
        }
        Returns: Record<string, unknown>
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
