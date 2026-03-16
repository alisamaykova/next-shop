import { makeObservable, observable, action } from "mobx";

import { isServer } from "@/shared/utils/isServer";

type PrivateFields = "_params" | "_updateUrl";

export class QueryParamsStore {
  private _params: URLSearchParams;

  constructor() {
    if (isServer) {
      this._params = new URLSearchParams();
    } else {
      this._params = new URLSearchParams(window.location.search);
    }
    makeObservable<this, PrivateFields>(this, {
      _params: observable,
      _updateUrl: action.bound,
      setParam: action.bound,
      setParams: action.bound,
    });
  }

  getParam(key: string): string {
    return this._params.get(key) || "";
  }

  getNumberParam(key: string, defaultValue: number | null): number | null {
    const value = this._params.get(key);
    return value ? Number(value) : defaultValue;
  }

  getArrayParam(key: string): string[] {
    const value = this._params.get(key);
    return value ? value.split(",") : [];
  }

  private _updateUrl() {
    if (isServer) return;
    const url = new URL(window.location.href);
    url.search = this._params.toString();
    window.history.pushState({}, "", url.toString());
  }

  setParam(key: string, value: string | number | string[]) {
    if (Array.isArray(value)) {
      if (value.length > 0) {
        this._params.set(key, value.join(","));
      } else {
        this._params.delete(key);
      }
    } else if (value) {
      this._params.set(key, String(value));
    } else {
      this._params.delete(key);
    }
    this._updateUrl();
  }

  setParams(updates: Record<string, string | number | string[]>) {
    const keysToKeep = new Set(Object.keys(updates));
    for (const key of Array.from(this._params.keys())) {
      if (!keysToKeep.has(key)) {
        this._params.delete(key);
      }
    }

    Object.entries(updates).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        if (value.length > 0) {
          this._params.set(key, value.join(","));
        } else {
          this._params.delete(key);
        }
      } else if (value) {
        this._params.set(key, String(value));
      } else {
        this._params.delete(key);
      }
    });

    this._updateUrl();
  }

  syncWithRouter(search: string) {
    this._params = new URLSearchParams(search);
  }
}
