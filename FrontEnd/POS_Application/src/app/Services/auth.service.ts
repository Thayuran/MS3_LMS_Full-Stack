import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, distinctUntilChanged, map, Observable, shareReplay, tap } from 'rxjs';
import { Router } from '@angular/router';
import { LoginResponse } from './loginResponse';
import { Credentials } from './credentials';
import { CreateAdminPayload } from './createAdminPayload';
import { User } from './user';



export interface AuthState {
  userId: number | null;
  access_token: string | null;
  token_type: string | null;
  expires_at: string | null;
  name: string | null;
  role: string | null; // admin, manager, economist, user
}

export const initialState: AuthState = {
  userId: null,
  access_token: null,
  token_type: null,
  expires_at: null,
  name: null,
  role: null,
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  adminExists$: Observable<boolean>;
  profile$: Observable<User>;

  constructor(
    @Inject(environment.apiUrl) public api: string,
    private http: HttpClient,
    private router: Router
  ) {
 this.adminExists$ = this.http
      .get<{ exists: boolean }>(`${this.api}/adminExists`)
      .pipe(
        map(res => res.exists),
        shareReplay(1)
      );

      this.profile$ = this.http.get<User>(`${this.api}/auth/user`);

  }

  private auth = new BehaviorSubject<AuthState>(this.getLocalState());
  public auth$ = this.auth.asObservable().pipe(distinctUntilChanged());

  get state(): AuthState {
    return this.auth.getValue();
  }

  get role(): string | null {
    return this.state.role;
  }

  // adminExists$ = this.http
  //   .get<{ exists: boolean }>(`${this.api}/adminExists`)
  //   .pipe(
  //     map(res => res.exists),
  //     shareReplay(1)
  //   );


  public getLocalState(): AuthState {
    const localState = localStorage.getItem('auth');
    if (localState) {
      return JSON.parse(localState) as AuthState;
    }
    return initialState;
  }

  login(credentials: Credentials): Observable<LoginResponse> {
    const path = `${this.api}/login`;
    return this.http.post<LoginResponse>(path, credentials).pipe(
      tap(data => {
        this.auth.next(data);
        localStorage.setItem('auth', JSON.stringify(data));
        this.router.navigateByUrl('/dashboard').then();
      })
    );
  }

  createAdmin(payload: CreateAdminPayload): Observable<{ message: string }> {
    const path = `${this.api}/createAdmin`;
    return this.http.post<{ message: string }>(path, payload);
  }

  changeName(name: string): Observable<User> {
    return this.http
      .post<User>(`${this.api}/auth/changeName`, { name })
      .pipe(tap(_ => this.auth.next({ ...this.auth.getValue(), name })));
  }

  changePassword(payload: any): Observable<User> {
    return this.http.post<User>(`${this.api}/auth/changePassword`, payload);
  }

  logout(): void {
    localStorage.removeItem('auth');
    this.auth.next(initialState);
    this.router.navigateByUrl('auth/login').then();
  }

  changeProfilePhoto(photo: any): Observable<any> {
    return this.http.post(
      `${this.api}/users/${this.state.userId}/setPhoto`,
      photo
    );
  }

}
