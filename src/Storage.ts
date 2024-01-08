import { GetResult, Preferences } from '@capacitor/preferences';


export default class Storage {
  public static set = async (key: string, value: any) => {
    await Preferences.set({
      key,
      value: JSON.stringify(value)
    });
  }

  public static get = async (key: string) => {
    const object: GetResult = await Preferences.get({ key });
    return JSON.parse(object.value || '[]');
  }

  public static clearAll = async () => {
    await Preferences.clear();
  }
}