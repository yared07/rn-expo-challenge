export interface Exercise {
  id: string;
  name: string;
  equipment: string;
  asset_url: string; // static image/thumbnail
  gif_asset_url: string; // animated GIF
  completed: boolean;
}
