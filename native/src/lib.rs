// PRNG sfc32 com seed FNV-1a. Deve produzir exatamente a mesma sequência de src/random.js.
use napi_derive::napi;

const ALGORITHM_VERSION: u32 = 1;

// Hash sobre unidades UTF-16, igual ao charCodeAt do JavaScript.
fn fnv1a(s: &str) -> u32 {
    let mut h: u32 = 2166136261;
    for unit in s.encode_utf16() {
        h ^= unit as u32;
        h = h.wrapping_mul(16777619);
    }
    h
}

#[napi]
pub fn algorithm_version() -> u32 {
    ALGORITHM_VERSION
}

#[napi]
pub struct NativeRandom {
    a: u32,
    b: u32,
    c: u32,
    d: u32,
}

#[napi]
impl NativeRandom {
    #[napi(constructor)]
    pub fn new(seed: String) -> Self {
        let mut r = NativeRandom {
            a: fnv1a(&format!("v{}:{}", ALGORITHM_VERSION, seed)),
            b: fnv1a(&format!("{}:b", seed)),
            c: fnv1a(&format!("{}:c", seed)),
            d: fnv1a(&format!("{}:d", seed)),
        };
        for _ in 0..16 {
            r.next();
        }
        r
    }

    // Float em [0, 1)
    #[napi]
    pub fn next(&mut self) -> f64 {
        self.d = self.d.wrapping_add(1);
        let t = self.a.wrapping_add(self.b).wrapping_add(self.d);
        self.a = self.b ^ (self.b >> 9);
        self.b = self.c.wrapping_add(self.c << 3);
        self.c = self.c.rotate_left(21);
        self.c = self.c.wrapping_add(t);
        t as f64 / 4294967296.0
    }
}
