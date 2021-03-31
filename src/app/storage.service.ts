import { Injectable } from '@angular/core';
import { SupabaseClient, createClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  supabaseUrl = 'your-url';
  supabaseKey =
    'your-key';

  public supabaseClient: SupabaseClient;

  constructor() {
    this.supabaseClient = createClient(this.supabaseUrl, this.supabaseKey);
  }

  async upload(bucket: string, path: string, file: File) {
    const { data, error } = await this.supabaseClient.storage
      .from(bucket)
      .upload(path, file);

    return { data, error };
  }
  
  async download(bucket: string, path: string) {
    const { data, error } = await this.supabaseClient.storage
      .from(bucket)
      .download(path);

    return { data, error };
  }

  async createBucket() {
    const { data, error } = await this.supabaseClient.storage.createBucket('photos');
    return { data, error };
  }

  async getBucket() {
    const { data, error } = await this.supabaseClient.storage.getBucket('photos');
    return { data, error };
  }
}
